using dotenv.net;
using dotenv.net.Utilities;
using Microsoft.EntityFrameworkCore;
using TicketService.API.Database;
using TicketService.API.Repositories;
using TicketService.API.Services;
using TicketService.API.Utilities;

DotEnv.Load(new DotEnvOptions(
    envFilePaths: new[] { ".env" },
    ignoreExceptions: false,
    probeForEnv: true,
    probeLevelsToSearch: 6
));

var connectionString = EnvReader.GetStringValue("CONNECTION_STRING");
var serviceDiscoveryUrl = EnvReader.GetStringValue("SERVICE_DISCOVERY_URL");
var serviceName = EnvReader.GetStringValue("SERVICE_NAME");
var serviceAddress = EnvReader.GetStringValue("SERVICE_ADRESS");
var servicePort = EnvReader.GetIntValue("SERVICE_PORT");
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<QrCodeGeneratorUtility>();
builder.Services.AddScoped<ITicketService, TicketService.API.Services.TicketService>();
builder.Services.AddScoped<ITicketRepository, TicketRepositoryDapper>();

builder.Services.AddControllers();
builder.Services.AddDbContext<TicketDbContext>(options => { options.UseSqlServer(connectionString); });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<TicketDbContext>();
    dbContext.Database.Migrate();
}

var logger = app.Services.GetRequiredService<ILogger<ServiceDiscoveryClient>>();

using (var httpClient = new HttpClient())
{
    var serviceDiscoveryClient = new ServiceDiscoveryClient(logger, httpClient, serviceDiscoveryUrl, serviceName,
        serviceAddress, servicePort);
    await serviceDiscoveryClient.RegisterServiceAsync();
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tickets API");
        c.RoutePrefix = string.Empty;
    });
}

app.UseCors("AllowAllOrigins");
app.MapControllers();

app.Run();

using dotenv.net;
using dotenv.net.Utilities;
using Microsoft.EntityFrameworkCore;
using NotificationService.BackgroundServices;
using NotificationService.Data;
using NotificationService.Middlewares;
using NotificationService.Repositories;
using NotificationService.Services;
using NotificationService.Validations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
DotEnv.Load();
var serviceDiscoveryUrl = EnvReader.GetStringValue("SERVICE_DISCOVERY_URL");
var serviceName = EnvReader.GetStringValue("SERVICE_NAME");
var serviceAddress = EnvReader.GetStringValue("SERVICE_ADDRESS");
var servicePort = EnvReader.GetIntValue("SERVICE_PORT");
var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING"); 
builder.Services.AddHostedService<NotificationBackgroundService>();
builder.Services.AddDbContext<NotificationDbContext>(
    options => options.UseSqlServer(connectionString)
);

builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IEmailRepository, EmailRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<INotificationService, NotififierService>();
builder.Services.AddScoped<INotifcationValidation, ScheduledNotificationValidation>();
builder.Services.AddControllers();

var app = builder.Build();

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
    app.UseSwaggerUI();
}
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var dbContext = services.GetRequiredService<NotificationDbContext>();
    dbContext.Database.Migrate();
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.MapControllers();
app.UseHttpsRedirection();
app.Run();
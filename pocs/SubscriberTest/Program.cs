using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SubscriberTest;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<SubscriptionService>();
builder.Services.AddControllers();


var app = builder.Build();

var subscriptionService = app.Services.GetRequiredService<SubscriptionService>();
await subscriptionService.SubscribeToEventBusAsync();

app.MapControllers();
app.Run();
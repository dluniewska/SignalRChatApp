using SignalRChatService.DataService;
using SignalRChatService.Hubs;

var builder = WebApplication.CreateBuilder(args);

var corsPolicyName = "ClientCors";
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<List<string>>();

// Add services to the container.
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicyName, corsBuilder =>
    {
        corsBuilder
        .WithOrigins(string.Join(", ", allowedOrigins))
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials(); // Allow credentials (cookies, authorization headers, etc., needed also for hubs without auth)
    });
});

builder.Services.AddSingleton<SharedConnectionsDB>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(corsPolicyName);

app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chat");

app.Run();

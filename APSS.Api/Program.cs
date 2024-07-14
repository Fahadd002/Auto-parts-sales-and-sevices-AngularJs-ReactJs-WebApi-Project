
using APSS.Lib.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AutoPartsDbContext>(op => op.UseSqlServer(builder.Configuration.GetConnectionString("db"), b=> b.MigrationsAssembly("APSS.Api")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("EnableCors",
                          policy =>
                          {
                              policy.WithOrigins("http://127.0.0.1:5084",
                                                  "http://127.0.0.1:4200",
                                                  "http://localhost:4200",
                                                  "http://localhost:5084",
                                                  "http://localhost:5173",
                                                    "http://localhost:5174")
                                                  .AllowAnyHeader()
                                                  .AllowAnyMethod();
                          });
});
builder.Services.AddControllers()
    .AddNewtonsoftJson(op =>
    {
        op.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
        op.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
    });
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseCors("EnableCors");
app.MapDefaultControllerRoute();

app.Run();

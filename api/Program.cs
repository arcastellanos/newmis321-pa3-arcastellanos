using api.Database;
using api.Models;
using api.Interface;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>{ options.AddPolicy("OpenPolicy", builder => { builder.AllowAnyOrigin() .AllowAnyMethod() .AllowAnyHeader(); }); });

// Add services to the container.


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

app.UseAuthorization();
app.UseCors("OpenPolicy");

app.MapControllers();

app.Run();

// Songs mySong = new Songs(){Title="Feathered Indians",Artist="Tyler Childers"};
// mySong.Save.CreateSong(mySong);
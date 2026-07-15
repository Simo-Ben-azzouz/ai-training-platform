using Boilerplate.Application.Common;
using Boilerplate.Infrastructure;
using EntityFramework.Exceptions.MySQL.Pomelo;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Testcontainers.MySql;

namespace Boilerplate.Api.IntegrationTests.Common;

public class CustomWebApplicationFactory : WebApplicationFactory<IAssemblyMarker>, IAsyncLifetime
{
    private readonly MySqlContainer _dbContainer = new MySqlBuilder()
        .WithUsername("app_user")
        .WithPassword("myHardCoreTestDb123")
        .WithDatabase("FormationDb")
        .WithName($"integration-tests-{Guid.NewGuid()}")
        .Build();

    private string _connString = default!;

    public HttpClient Client { get; private set; } = default!;

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.ConfigureServices(services =>
        {
            var serviceTypes = new List<Type>
            {
                typeof(DbContextOptions<ApplicationDbContext>),
            };
            var contextsDescriptor = services.Where(d => serviceTypes.Contains(d.ServiceType)).ToList();
            foreach (var descriptor in contextsDescriptor)
            {
                services.Remove(descriptor);
            }

            services.AddSingleton(_ => new DbContextOptionsBuilder<ApplicationDbContext>()
                .EnableDetailedErrors()
                .EnableSensitiveDataLogging()
                .UseMySql(_connString, ServerVersion.AutoDetect(_connString))
                .UseExceptionProcessor()
                .Options);
        }).ConfigureLogging(o => o.AddFilter(loglevel => loglevel >= LogLevel.Error));
        base.ConfigureWebHost(builder);
    }

    public IContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .EnableDetailedErrors()
            .EnableSensitiveDataLogging()
            .UseMySql(_connString, ServerVersion.AutoDetect(_connString))
            .UseExceptionProcessor()
            .Options;
        return new ApplicationDbContext(options);
    }

    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
        _connString = _dbContainer.GetConnectionString();
        Client = CreateClient();
    }

    public async Task ResetDatabaseAsync()
    {
        await using var context = (ApplicationDbContext)CreateContext();

        context.UserSessions.RemoveRange(context.UserSessions);
        context.Sessions.RemoveRange(context.Sessions);
        context.Formations.RemoveRange(context.Formations);
        context.Categories.RemoveRange(context.Categories);
        context.Users.RemoveRange(context.Users);
        context.Roles.RemoveRange(context.Roles);

        await context.SaveChangesAsync();
    }

    async Task IAsyncLifetime.DisposeAsync()
    {
        await _dbContainer.DisposeAsync();
    }
}

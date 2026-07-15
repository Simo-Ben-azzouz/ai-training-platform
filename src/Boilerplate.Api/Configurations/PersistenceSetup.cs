using Boilerplate.Application.Auth;
using Boilerplate.Domain.Auth.Interfaces;
using Boilerplate.Infrastructure;
using EntityFramework.Exceptions.MySQL.Pomelo;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Boilerplate.Api.Configurations;

public static class PersistenceSetup
{
    public static IServiceCollection AddPersistenceSetup(this IServiceCollection services, IConfiguration configuration)
    {

        services.AddScoped<ISession, Session>();
        services.AddHostedService<ApplicationDbInitializer>();
        services.AddDbContextPool<ApplicationDbContext>(o =>
        {
            var connectionString = configuration.GetConnectionString("DefaultConnection");

            o.UseMySql(
                connectionString,
                ServerVersion.AutoDetect(connectionString));

            o.UseExceptionProcessor();
        });

        return services;
    }
}
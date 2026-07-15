using Boilerplate.Application.Common;
using Boilerplate.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Boilerplate.Api.Configurations;

public static class ApplicationSetup
{
    public static IServiceCollection AddApplicationSetup(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IContext, ApplicationDbContext>();
        services.AddHttpClient<IAITrainerService, AnamAIService>(client =>
        {
            var baseUrl = configuration["AnamAI:BaseUrl"] ?? "https://api.anam.ai/v1/";
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                client.BaseAddress = new Uri(baseUrl);
            }

            client.Timeout = TimeSpan.FromSeconds(configuration.GetValue("AnamAI:TimeoutSeconds", 30));
        });

        return services;
    }
}

using Boilerplate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Boilerplate.Infrastructure;

public class ApplicationDbInitializer : IHostedService
{
    private readonly ILogger<ApplicationDbInitializer> _logger;
    private readonly IServiceProvider _serviceProvider;
    private readonly IHostEnvironment _environment;

    public ApplicationDbInitializer(
        ILogger<ApplicationDbInitializer> logger,
        IServiceProvider serviceProvider,
        IHostEnvironment environment)
    {
        _logger = logger;
        _serviceProvider = serviceProvider;
        _environment = environment;
    }
    
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await using var scope = _serviceProvider.CreateAsyncScope();
        
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        var strategy = context.Database.CreateExecutionStrategy();
        _logger.LogInformation("Running migrations for {Context}", nameof(ApplicationDbContext));
        await strategy.ExecuteAsync(async () => await context.Database.MigrateAsync(cancellationToken: cancellationToken));
        _logger.LogInformation("Migrations applied successfully");

        if (_environment.IsDevelopment())
        {
            await SeedDevelopmentDataAsync(scope.ServiceProvider, context, cancellationToken);
        }
    }

    public Task StopAsync(CancellationToken cancellationToken) =>
        Task.CompletedTask;

    private async Task SeedDevelopmentDataAsync(
        IServiceProvider serviceProvider,
        ApplicationDbContext context,
        CancellationToken cancellationToken)
    {
        if (!await context.Categories.AnyAsync(cancellationToken))
        {
            var development = new Category
            {
                Name = "Developpement web",
                Description = "Construisez des applications web modernes et maintenables."
            };
            var data = new Category
            {
                Name = "Data et intelligence artificielle",
                Description = "Exploitez les donnees et l'intelligence artificielle pour creer de la valeur."
            };
            var design = new Category
            {
                Name = "Design et experience utilisateur",
                Description = "Concevez des experiences claires, accessibles et memorables."
            };
            var management = new Category
            {
                Name = "Management et competences transversales",
                Description = "Developpez votre efficacite individuelle et collective."
            };

            var dotnet = new Formation
            {
                Title = "ASP.NET Core : creer une API REST",
                Description = "Apprenez a concevoir, securiser et documenter une API REST avec ASP.NET Core.",
                Duration = 21,
                Level = "Intermediaire",
                CategoryId = development.Id
            };
            var angular = new Formation
            {
                Title = "Angular : applications modernes",
                Description = "Maitrisez les composants, les routes et les services Angular.",
                Duration = 18,
                Level = "Debutant",
                CategoryId = development.Id
            };
            var python = new Formation
            {
                Title = "Python pour la data analyse",
                Description = "Transformez des donnees brutes en analyses utiles avec Python.",
                Duration = 16,
                Level = "Debutant",
                CategoryId = data.Id
            };
            var ux = new Formation
            {
                Title = "UX design : fondamentaux",
                Description = "Placez les besoins utilisateurs au centre de vos produits numeriques.",
                Duration = 14,
                Level = "Debutant",
                CategoryId = design.Id
            };
            var leadership = new Formation
            {
                Title = "Leadership et communication",
                Description = "Animez vos equipes avec clarte, ecoute et impact.",
                Duration = 12,
                Level = "Intermediaire",
                CategoryId = management.Id
            };

            var now = DateTime.UtcNow.Date;
            var sessions = new[]
            {
                new Session { FormationId = dotnet.Id, Title = "API REST avec ASP.NET Core", StartDate = now.AddDays(2).AddHours(9), EndDate = now.AddDays(2).AddHours(12), MeetingLink = "https://meet.google.com/forma-dotnet" },
                new Session { FormationId = angular.Id, Title = "Demarrer avec Angular", StartDate = now.AddDays(4).AddHours(14), EndDate = now.AddDays(4).AddHours(17), MeetingLink = "https://meet.google.com/forma-angular" },
                new Session { FormationId = python.Id, Title = "Analyse de donnees avec Python", StartDate = now.AddDays(7).AddHours(9), EndDate = now.AddDays(7).AddHours(12), MeetingLink = "https://meet.google.com/forma-python" },
                new Session { FormationId = ux.Id, Title = "Atelier UX design", StartDate = now.AddDays(9).AddHours(14), EndDate = now.AddDays(9).AddHours(17), MeetingLink = "https://meet.google.com/forma-ux" },
                new Session { FormationId = leadership.Id, Title = "Communiquer avec impact", StartDate = now.AddDays(12).AddHours(10), EndDate = now.AddDays(12).AddHours(12), MeetingLink = "https://meet.google.com/forma-leadership" }
            };

            context.Categories.AddRange(development, data, design, management);
            context.Formations.AddRange(dotnet, angular, python, ux, leadership);
            context.Sessions.AddRange(sessions);
            await context.SaveChangesAsync(cancellationToken);
        }

        const string demoEmail = "demo@forma.ma";
        var userManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();
        var demoUser = await userManager.FindByEmailAsync(demoEmail);

        if (demoUser is null)
        {
            demoUser = new ApplicationUser
            {
                UserName = demoEmail,
                Email = demoEmail,
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(demoUser, "Demo123!");
            if (!result.Succeeded)
            {
                throw new InvalidOperationException($"Unable to create the demo user: {string.Join(", ", result.Errors.Select(error => error.Description))}");
            }
        }

        if (!await context.UserSessions.AnyAsync(userSession => userSession.UserId == demoUser.Id, cancellationToken))
        {
            var sessions = await context.Sessions.OrderBy(session => session.StartDate).Take(2).ToListAsync(cancellationToken);
            context.UserSessions.AddRange(sessions.Select(session => new UserSession
            {
                UserId = demoUser.Id,
                SessionId = session.Id,
                RegisteredAt = DateTime.UtcNow
            }));
            await context.SaveChangesAsync(cancellationToken);
        }

        _logger.LogInformation("Development seed data is ready. Demo account: {Email}", demoEmail);
    }
}

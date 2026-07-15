using Boilerplate.Application.Common;
using Boilerplate.Domain.Entities;
using System;

namespace Boilerplate.Api.IntegrationTests.Helpers;

public static class TestingDatabase
{
    public static async Task SeedDatabase(Func<IContext> contextFactory)
    {
        await using var db = contextFactory();

        var categoryId = new Guid("824a7a65-b769-4b70-bccb-91f880b6ddf1");
        var formationId = new Guid("b426070e-ccb3-42e6-8fb4-ef6aa5a62cc4");
        var sessionId = new Guid("634769f7-a7b8-4146-9cb2-ff2dd90e886b");

        db.Categories.Add(new Category
        {
            Id = categoryId,
            Name = "Backend",
            Description = "Backend development training"
        });

        db.Formations.Add(new Formation
        {
            Id = formationId,
            CategoryId = categoryId,
            Title = "ASP.NET Core API",
            Description = "Build APIs with ASP.NET Core",
            Duration = 20,
            Level = "Beginner"
        });

        db.Sessions.Add(new Session
        {
            Id = sessionId,
            FormationId = formationId,
            Title = "Minimal APIs",
            StartDate = DateTime.UtcNow.AddDays(1),
            EndDate = DateTime.UtcNow.AddDays(1).AddHours(2),
            MeetingLink = "https://example.com/session"
        });

        await db.SaveChangesAsync();
    }
}

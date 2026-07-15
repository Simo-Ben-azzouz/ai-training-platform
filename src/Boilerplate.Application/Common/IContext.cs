using Boilerplate.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Boilerplate.Application.Common;

public interface IContext : IAsyncDisposable, IDisposable
{
    public DatabaseFacade Database { get; }
    public DbSet<Formation> Formations { get; }
    public DbSet<Category> Categories { get; }
    public DbSet<Session> Sessions { get; }
    public DbSet<UserSession> UserSessions { get; }

    
    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

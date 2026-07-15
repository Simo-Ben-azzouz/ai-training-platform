using Boilerplate.Domain.Entities.Common;
using System;

namespace Boilerplate.Domain.Entities;

public class UserSession : Entity<UserSessionId>
{
    public override UserSessionId Id { get; set; } = Guid.CreateVersion7();
    public Guid UserId { get; set; }
    public SessionId SessionId { get; set; }
    public Session Session { get; set; } = null!;
    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
}

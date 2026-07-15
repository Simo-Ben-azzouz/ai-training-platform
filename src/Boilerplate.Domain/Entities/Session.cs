using Boilerplate.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace Boilerplate.Domain.Entities;

public class Session : Entity<SessionId>
{
    public override SessionId Id { get; set; } = Guid.CreateVersion7();
    public FormationId FormationId { get; set; }
    public Formation Formation { get; set; } = null!;

    public string Title { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string MeetingLink { get; set; } = null!;
    public ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();
}

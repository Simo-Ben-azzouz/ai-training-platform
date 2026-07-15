using Boilerplate.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Boilerplate.Infrastructure;

public class ApplicationUser : IdentityUser<Guid>
{
    public override Guid Id { get; set; } = Guid.CreateVersion7();
    public ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();
}

public class ApplicationRole : IdentityRole<Guid>
{
    public override Guid Id { get; set; } = Guid.CreateVersion7();
}

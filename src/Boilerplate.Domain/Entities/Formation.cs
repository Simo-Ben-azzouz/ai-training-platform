using Boilerplate.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace Boilerplate.Domain.Entities;

public class Formation : Entity<FormationId>
{
    public override FormationId Id { get; set; } = Guid.CreateVersion7();
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int Duration { get; set; }
    public string Level { get; set; } = null!;

    public CategoryId CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    public ICollection<Session> Sessions { get; set; } = new List<Session>();
}
using Boilerplate.Domain.Entities.Common;
using System;
using System.Collections.Generic;

namespace Boilerplate.Domain.Entities;

public class Category : Entity<CategoryId>
{
    public override CategoryId Id { get; set; } = Guid.CreateVersion7();
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;

    public ICollection<Formation> Formations { get; set; } = new List<Formation>();
}
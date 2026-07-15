using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boilerplate.Infrastructure.Configuration;

public class FormationConfiguration : IEntityTypeConfiguration<Formation>
{
    public void Configure(EntityTypeBuilder<Formation> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasConversion<FormationId.EfCoreValueConverter>();

        builder.Property(x => x.CategoryId)
            .HasConversion<CategoryId.EfCoreValueConverter>();

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(x => x.Description)
            .IsRequired()
            .HasMaxLength(2000);

        builder.Property(x => x.Level)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasOne(x => x.Category)
            .WithMany(x => x.Formations)
            .HasForeignKey(x => x.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
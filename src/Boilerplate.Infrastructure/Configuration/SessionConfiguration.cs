using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boilerplate.Infrastructure.Configuration;

public class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasConversion<SessionId.EfCoreValueConverter>();

        builder.Property(x => x.FormationId)
            .HasConversion<FormationId.EfCoreValueConverter>();

        builder.Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(250);

        builder.Property(x => x.MeetingLink)
            .IsRequired()
            .HasMaxLength(500);

        builder.HasOne(x => x.Formation)
            .WithMany(x => x.Sessions)
            .HasForeignKey(x => x.FormationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
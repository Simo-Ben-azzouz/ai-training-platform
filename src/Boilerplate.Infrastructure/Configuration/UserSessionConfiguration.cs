using Boilerplate.Domain.Entities;
using Boilerplate.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Boilerplate.Infrastructure.Configuration;

public class UserSessionConfiguration : IEntityTypeConfiguration<UserSession>
{
    public void Configure(EntityTypeBuilder<UserSession> builder)
    {
        builder.HasKey(x => x.Id);

        builder.Property(x => x.Id)
            .HasConversion<UserSessionId.EfCoreValueConverter>();

        builder.Property(x => x.SessionId)
            .HasConversion<SessionId.EfCoreValueConverter>();

        builder.HasIndex(x => new { x.UserId, x.SessionId })
            .IsUnique();

        builder.HasOne(x => x.Session)
            .WithMany(x => x.UserSessions)
            .HasForeignKey(x => x.SessionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

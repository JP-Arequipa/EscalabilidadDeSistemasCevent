using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class AttendanceMap : BaseMap<Attendance, int>
{

    protected override void ConfigureRelationships(EntityTypeBuilder<Attendance> builder)
    {
        builder.HasOne(a => a.User)
            .WithMany(u => u.Attendances)
            .HasForeignKey(a => a.UserId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired();
    }
}
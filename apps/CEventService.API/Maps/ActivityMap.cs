using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class ActivityMap : BaseMap<Activity, int>
{
    protected override void ConfigureRelationships(EntityTypeBuilder<Activity> builder)
    {
        builder.HasMany(a => a.Attendances)
            .WithOne(att => att.Activity)
            .HasForeignKey(att => att.ActivityId)
            .IsRequired();
    }
}
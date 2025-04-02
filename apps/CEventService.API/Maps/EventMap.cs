using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class EventMap : BaseMap<Event, int>
{
    public override void Configure(EntityTypeBuilder<Event> builder)
    {
        base.Configure(builder);
        ConfigureEnumConversion(builder);
        ConfigureLocationType(builder);
    }
    private static void ConfigureEnumConversion(EntityTypeBuilder<Event> builder)
    {
        builder.Property(e => e.Status).HasConversion<string>();
    }

    private static void ConfigureLocationType(EntityTypeBuilder<Event> builder)
    {
        builder.OwnsOne(e => e.Location);
    }

    protected override void ConfigureRelationships(EntityTypeBuilder<Event> builder)
    {
        builder.HasMany(e => e.Activities)
            .WithOne(a => a.Event)
            .HasForeignKey(a => a.EventId)
            .IsRequired();
        
        builder.HasMany(e => e.CoOrganizers)
            .WithMany(u => u.CoOrganizedEvents)
            .UsingEntity<Dictionary<string, object>>(
                "EventCoOrganizer",
                e => e.HasOne<User>().WithMany().HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.NoAction),
                u => u.HasOne<Event>().WithMany().HasForeignKey("EventId")
                    .OnDelete(DeleteBehavior.NoAction));

        builder.HasOne(e => e.Category)
            .WithMany(c => c.Events)
            .HasForeignKey(e => e.CategoryId)
            .IsRequired();
    }
}
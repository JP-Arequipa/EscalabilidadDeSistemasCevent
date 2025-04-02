using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

using Models;

public class EventClickMap : BaseMap<EventClick, int>
{
    protected override void ConfigureRelationships(EntityTypeBuilder<EventClick> builder)
    {
        builder
            .HasOne(ec => ec.Event)
            .WithMany(e => e.EventClicks)
            .HasForeignKey(ec => ec.EventId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(ec => ec.User)
            .WithMany(u => u.EventClicks)
            .HasForeignKey(ec => ec.UserId)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
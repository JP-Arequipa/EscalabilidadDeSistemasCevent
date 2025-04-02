using CEventService.API.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class EventCategoryMap : BaseMap<EventCategory, int>
{
    protected override void ConfigureRelationships(EntityTypeBuilder<EventCategory> builder)
    {
        builder.HasMany(c => c.Events)
            .WithOne(e => e.Category)
            .HasForeignKey(e => e.CategoryId)
            .IsRequired();
    }
}
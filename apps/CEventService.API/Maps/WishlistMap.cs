using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public class WishlistMap : BaseMap<Wishlist, int>
{
    protected override void ConfigureRelationships(EntityTypeBuilder<Wishlist> builder)
    {
        builder.HasOne(w => w.User)
            .WithMany(u => u.Wishlists)
            .HasForeignKey(w => w.UserId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired();

        builder.HasOne(w => w.Event)
            .WithMany(e => e.Wishlists)
            .HasForeignKey(w => w.EventId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired();
    }
}
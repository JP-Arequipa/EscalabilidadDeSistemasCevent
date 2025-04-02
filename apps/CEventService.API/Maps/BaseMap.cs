using CEventService.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CEventService.API.Maps;

public abstract class BaseMap<T, TId> : IEntityTypeConfiguration<T> where T : BaseEntity<TId>
{
    public virtual void Configure(EntityTypeBuilder<T> builder)
    {
        ConfigureTableAndKeys(builder);
        ConfigureFilters(builder);
        ConfigureRelationships(builder);
        ConfigureDefaultValues(builder);
    }

    protected abstract void ConfigureRelationships(EntityTypeBuilder<T> builder);

    private static void ConfigureFilters(EntityTypeBuilder<T> builder)
    {
        builder.HasQueryFilter(t => !t.IsDeleted);
    }

    protected virtual void ConfigureTableAndKeys(EntityTypeBuilder<T> builder)
    {
        builder.ToTable(typeof(T).Name);
        builder.HasKey(a => a.Id);
        builder.Property(a => a.Id).ValueGeneratedOnAdd();
        builder.HasIndex(a => a.Id).IsUnique();
    }

    private static void ConfigureDefaultValues(EntityTypeBuilder<T> builder)
    {
        builder.Property(t => t.IsDeleted).HasDefaultValue(false);
    }
}
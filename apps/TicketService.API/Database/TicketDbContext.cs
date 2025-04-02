using Microsoft.EntityFrameworkCore;
using TicketService.API.Models;

namespace TicketService.API.Database
{
    public class TicketDbContext : DbContext
    {
        public TicketDbContext(DbContextOptions<TicketDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.HasKey(e => e.TicketId);
                entity.Property(e => e.QRContent).IsRequired();
                entity.Property(e => e.EventId).IsRequired();
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.IsUsed).HasDefaultValue(false);
            });
        }
    }
}
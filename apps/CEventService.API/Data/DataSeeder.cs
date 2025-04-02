using System.IO;
using Microsoft.EntityFrameworkCore;

namespace CEventService.API.Data;

public class DataSeeder
{
    public static async Task SeedData(AppDbContext context)
    {
        var scriptPath = Path.Combine(Directory.GetCurrentDirectory(), "Scripts", "data.sql");
        var sqlScript = await File.ReadAllTextAsync(scriptPath);

        using (var transaction = await context.Database.BeginTransactionAsync())
        {
            await context.Database.ExecuteSqlRawAsync(sqlScript);
            await transaction.CommitAsync();
        }
    }
}

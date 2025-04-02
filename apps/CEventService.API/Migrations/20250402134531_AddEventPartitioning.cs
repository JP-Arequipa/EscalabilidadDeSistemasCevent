using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CEventService.API.Migrations
{
    public partial class AddEventPartitioning : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Primero eliminar todas las restricciones de clave foránea
            migrationBuilder.Sql(@"
        -- Eliminar restricciones de clave foránea en lugar de deshabilitarlas
        ALTER TABLE [Activity] DROP CONSTRAINT [FK_Activity_Event_EventId];
        ALTER TABLE [EventClick] DROP CONSTRAINT [FK_EventClick_Event_EventId];
        ALTER TABLE [EventCoOrganizer] DROP CONSTRAINT [FK_EventCoOrganizer_Event_EventId];
        ALTER TABLE [Registration] DROP CONSTRAINT [FK_Registration_Event_EventId];
        ALTER TABLE [Wishlist] DROP CONSTRAINT [FK_Wishlist_Event_EventId];
    ");

            // 2. Crear función de partición (si no existe)
            migrationBuilder.Sql(@"
        IF NOT EXISTS (SELECT * FROM sys.partition_functions WHERE name = 'EventDatePartitionFunction')
        BEGIN
            CREATE PARTITION FUNCTION EventDatePartitionFunction (DATETIME2)
            AS RANGE RIGHT FOR VALUES ('2024-01-01', '2025-01-01', '2026-01-01');
        END
    ");

            // 3. Crear esquema de partición (si no existe)
            migrationBuilder.Sql(@"
        IF NOT EXISTS (SELECT * FROM sys.partition_schemes WHERE name = 'EventDatePartitionScheme')
        BEGIN
            CREATE PARTITION SCHEME EventDatePartitionScheme
            AS PARTITION EventDatePartitionFunction
            TO ([PRIMARY], [PRIMARY], [PRIMARY], [PRIMARY]);
        END
    ");

            // 4. Crear tabla temporal con partitioning
            migrationBuilder.Sql(@"
        CREATE TABLE [Event_temp] (
            [Id] int NOT NULL IDENTITY,
            [Name] nvarchar(max) NOT NULL,
            [ShortDescription] nvarchar(max) NOT NULL,
            [Description] nvarchar(max) NOT NULL,
            [CategoryId] int NOT NULL,
            [EventDate] datetime2 NOT NULL,
            [Location_Latitude] decimal(18,2) NOT NULL,
            [Location_Longitude] decimal(18,2) NOT NULL,
            [Venue] nvarchar(max) NOT NULL,
            [TicketPrice] decimal(18,2) NOT NULL,
            [CoverPhotoUrl] nvarchar(max) NOT NULL,
            [AttendanceTrackingEnabled] bit NOT NULL,
            [Status] nvarchar(max) NOT NULL,
            [Capacity] int NOT NULL,
            [OrganizerUserId] uniqueidentifier NOT NULL,
            [Address] nvarchar(max) NOT NULL,
            [AttendeeCount] int NOT NULL,
            [IsPromoted] bit NOT NULL,
            [IsDeleted] bit NOT NULL DEFAULT CAST(0 AS bit),
            [CreatedAt] datetime2 NOT NULL,
            CONSTRAINT [PK_Event_temp] PRIMARY KEY ([Id]),
            CONSTRAINT [FK_Event_temp_EventCategory_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [EventCategory] ([Id]) ON DELETE CASCADE,
            CONSTRAINT [FK_Event_temp_User_OrganizerUserId] FOREIGN KEY ([OrganizerUserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
        ) ON [PRIMARY];
        
        CREATE INDEX [IX_Event_temp_EventDate] ON [Event_temp]([EventDate])
        ON EventDatePartitionScheme(EventDate);
    ");

            // 5. Copiar datos
            migrationBuilder.Sql(@"
        SET IDENTITY_INSERT [Event_temp] ON;
        INSERT INTO [Event_temp] (
            [Id], [Name], [ShortDescription], [Description], [CategoryId], [EventDate],
            [Location_Latitude], [Location_Longitude], [Venue], [TicketPrice], [CoverPhotoUrl],
            [AttendanceTrackingEnabled], [Status], [Capacity], [OrganizerUserId], [Address],
            [AttendeeCount], [IsPromoted], [IsDeleted], [CreatedAt]
        )
        SELECT 
            [Id], [Name], [ShortDescription], [Description], [CategoryId], [EventDate],
            [Location_Latitude], [Location_Longitude], [Venue], [TicketPrice], [CoverPhotoUrl],
            [AttendanceTrackingEnabled], [Status], [Capacity], [OrganizerUserId], [Address],
            [AttendeeCount], [IsPromoted], [IsDeleted], [CreatedAt]
        FROM [Event];
        SET IDENTITY_INSERT [Event_temp] OFF;
    ");

            // 6. Eliminar la tabla original
            migrationBuilder.DropTable(name: "Event");

            // 7. Renombrar la tabla temporal
            migrationBuilder.RenameTable(
                name: "Event_temp",
                newName: "Event");

            // 8. Recrear índices
            migrationBuilder.Sql(@"
        CREATE INDEX [IX_Event_CategoryId] ON [Event] ([CategoryId]);
        CREATE INDEX [IX_Event_OrganizerUserId] ON [Event] ([OrganizerUserId]);
    ");

            // 9. Recrear restricciones de clave foránea
            migrationBuilder.Sql(@"
        ALTER TABLE [Activity] ADD CONSTRAINT [FK_Activity_Event_EventId] 
            FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id]) ON DELETE CASCADE;
            
        ALTER TABLE [EventClick] ADD CONSTRAINT [FK_EventClick_Event_EventId] 
            FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id]);
            
        ALTER TABLE [EventCoOrganizer] ADD CONSTRAINT [FK_EventCoOrganizer_Event_EventId] 
            FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id]);
            
        ALTER TABLE [Registration] ADD CONSTRAINT [FK_Registration_Event_EventId] 
            FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id]);
            
        ALTER TABLE [Wishlist] ADD CONSTRAINT [FK_Wishlist_Event_EventId] 
            FOREIGN KEY ([EventId]) REFERENCES [Event] ([Id]);
    ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
        }
    }
}
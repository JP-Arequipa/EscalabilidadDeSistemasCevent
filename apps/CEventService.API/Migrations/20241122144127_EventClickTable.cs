using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CEventService.API.Migrations
{
    /// <inheritdoc />
    public partial class EventClickTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventClick",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventClick", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventClick_Event_EventId",
                        column: x => x.EventId,
                        principalTable: "Event",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EventClick_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EventClick_EventId",
                table: "EventClick",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventClick_Id",
                table: "EventClick",
                column: "Id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventClick_UserId",
                table: "EventClick",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventClick");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CEventService.API.Migrations
{
    /// <inheritdoc />
    public partial class IsPromotedEventValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Attendance");

            migrationBuilder.RenameColumn(
                name: "AddedAt",
                table: "Wishlist",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "RegisteredAt",
                table: "Registration",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "AttendanceTime",
                table: "Attendance",
                newName: "CreatedAt");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "EventCategory",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsPromoted",
                table: "Event",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "EventCategory");

            migrationBuilder.DropColumn(
                name: "IsPromoted",
                table: "Event");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Wishlist",
                newName: "AddedAt");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Registration",
                newName: "RegisteredAt");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Attendance",
                newName: "AttendanceTime");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Attendance",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

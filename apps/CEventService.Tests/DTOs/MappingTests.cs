using CEventService.API.DTOs.Activity;
using CEventService.API.DTOs.Event;
using CEventService.API.Models;

namespace CEventService.API.DTOs;

using AutoMapper;
using Xunit;

public class MappingTests
{
    private readonly IConfigurationProvider _configuration;
    private readonly IMapper _mapper;

    public MappingTests()
    {
        _configuration = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });
        _mapper = _configuration.CreateMapper();
    }

    [Fact]
    public void Should_Map_Event_To_EventOutputDTO()
    {
        // Arrange
        var eventEntity = new Models.Event
        {
            Name = "Sample Event",
            Description = "Sample Description",
            Category = "Category 1",
            EventDate = DateTime.Now,
            Location = new Location
            {
                Latitude = 12.34m,
                Longitude = 56.78m
            },
            Venue = "Venue 1",
            TicketPrice = 100.00m,
            CoverPhotoUrl = "https://example.com/photo.jpg",
            AttendanceTrackingEnabled = true,
            Capacity = 100,
            Address = "Av. Melchor Perez",
            Status = "pending",
            OrganizerUserId = "1"
        };

        // Act
        var eventOutputDto = _mapper.Map<EventOutputDto>(eventEntity);

        // Assert
        Assert.Equal(eventEntity.Name, eventOutputDto.Name);
        Assert.Equal(eventEntity.Description, eventOutputDto.Description);
        Assert.Equal(eventEntity.Category, eventOutputDto.Category);
        Assert.Equal(eventEntity.Address, eventOutputDto.Address);
    }

    [Fact]
    public void Should_Map_Event_To_EventHomePageDTO()
    {
        // Arrange
        var eventEntity = new Models.Event
        {
            Name = "Sample Event",
            Description = "Sample Description",
            Category = "Category 1",
            EventDate = DateTime.Now,
            Location = new Location
            {
                Latitude = 12.34m,
                Longitude = 56.78m
            },
            Venue = "Venue 1",
            TicketPrice = 100.00m,
            CoverPhotoUrl = "https://example.com/photo.jpg",
            AttendanceTrackingEnabled = true,
            Capacity = 100,
            Address = "Av. Melchor Perez",
            Status = "pending",
            OrganizerUserId = "1"
        };
        
        // Act
        var eventHomePageDto = _mapper.Map<EventHomePageDto>(eventEntity);

        // Assert
        Assert.Equal(eventEntity.Name, eventHomePageDto.Name);
        Assert.Equal(eventEntity.Address, eventHomePageDto.Address);

    }
}

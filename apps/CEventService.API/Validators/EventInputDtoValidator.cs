using CEventService.API.DTOs.Event;
using FluentValidation;

namespace CEventService.API.Validations;

public class EventInputDtoValidator : AbstractValidator<EventInputDto>
{
    public EventInputDtoValidator()
    {
        RuleForName();
        RuleForShortDescription();
        RuleForDescription();
        RuleForCategoryId();
        RuleForEventDate();
        RuleForLocation();
        RuleForVenue();
        RuleForTicketPrice();
        RuleForCoverPhotoUrl();
        RuleForStatus();
        RuleForCapacity();
        RuleForOrganizerUserId();
        RuleForCreatedAt();
        RuleForAddress();
        RuleForAttendeeCount();
        RuleForActivities();
        RuleForCoOrganizers();
    }

    private void RuleForName()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Event name is required.")
            .MaximumLength(100).WithMessage("Event name must not exceed 100 characters.");
    }

    private void RuleForShortDescription()
    {
        RuleFor(x => x.ShortDescription)
            .NotEmpty().WithMessage("Short description is required.")
            .MaximumLength(250).WithMessage("Short description must not exceed 250 characters.");
    }

    private void RuleForDescription()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MinimumLength(20).WithMessage("Description must be at least 20 characters long.");
    }

    private void RuleForCategoryId()
    {
        RuleFor(x => x.CategoryId)
            .GreaterThan(0).WithMessage("CategoryId must be greater than 0.");
    }

    private void RuleForEventDate()
    {
        RuleFor(x => x.EventDate)
            .GreaterThanOrEqualTo(DateTime.UtcNow).WithMessage("Event date must be in the future.");
    }

    private void RuleForLocation()
    {
        RuleFor(x => x.Location)
            .NotNull().WithMessage("Location is required.");
    }

    private void RuleForVenue()
    {
        RuleFor(x => x.Venue)
            .NotEmpty().WithMessage("Venue is required.")
            .MaximumLength(150).WithMessage("Venue must not exceed 150 characters.");
    }

    private void RuleForTicketPrice()
    {
        RuleFor(x => x.TicketPrice)
            .GreaterThanOrEqualTo(0).WithMessage("Ticket price must be zero or positive.");
    }

    private void RuleForCoverPhotoUrl()
    {
        RuleFor(x => x.CoverPhotoUrl)
            .NotEmpty().WithMessage("Cover photo URL is required.")
            .Must(url => Uri.TryCreate(url, UriKind.Absolute, out _)).WithMessage("Invalid cover photo URL format.");
    }

    private void RuleForStatus()
    {
        RuleFor(x => x.Status)
            .IsInEnum().WithMessage("Invalid event status.");
    }

    private void RuleForCapacity()
    {
        RuleFor(x => x.Capacity)
            .GreaterThanOrEqualTo(0).WithMessage("Capacity must be zero or positive.");
    }

    private void RuleForOrganizerUserId()
    {
        RuleFor(x => x.OrganizerUserId)
            .NotEmpty().WithMessage("OrganizerUserId is required.");
    }

    private void RuleForCreatedAt()
    {
        RuleFor(x => x.CreatedAt)
            .LessThanOrEqualTo(DateTime.UtcNow).WithMessage("CreatedAt cannot be a future date.");
    }

    private void RuleForAddress()
    {
        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("Address is required.")
            .MaximumLength(200).WithMessage("Address must not exceed 200 characters.");
    }

    private void RuleForAttendeeCount()
    {
        RuleFor(x => x.AttendeeCount)
            .GreaterThanOrEqualTo(0).WithMessage("AttendeeCount must be zero or positive.");
    }

    private void RuleForActivities()
    {
        RuleForEach(x => x.Activities)
            .SetValidator(new ActivityInputDtoValidator());
    }

    private void RuleForCoOrganizers()
    {
        RuleForEach(x => x.CoOrganizers)
            .NotEmpty().WithMessage("Co-organizer IDs must not be empty.")
            .Must(coOrganizerId => Guid.TryParse(coOrganizerId.ToString(), out _))
            .WithMessage("Each Co-organizer ID must be a valid Guid.");
    }

}
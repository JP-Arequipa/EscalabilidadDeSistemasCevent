using CEventService.API.DTOs.Activity;
using FluentValidation;

namespace CEventService.API.Validations;

public class ActivityInputDtoValidator : AbstractValidator<ActivityInputDto>
{
    public ActivityInputDtoValidator()
    {
        RuleForName();
        RuleForDescription();
        RuleForStartTime();
        RuleForEndTime();
        RuleForCapacity();
    }
    private void RuleForName()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Activity name is required.")
            .MaximumLength(100).WithMessage("Activity name must not exceed 100 characters.");
    }

    private void RuleForDescription()
    {
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MinimumLength(20).WithMessage("Description must be at least 20 characters long.")
            .MaximumLength(500).WithMessage("Description must not exceed 500 characters.");
    }

    private void RuleForStartTime()
    {
        RuleFor(x => x.StartTime)
            .GreaterThanOrEqualTo(DateTime.UtcNow).WithMessage("Start time must be in the future.");
    }

    private void RuleForEndTime()
    {
        RuleFor(x => x.EndTime)
            .GreaterThan(x => x.StartTime).WithMessage("End time must be after the start time.");
    }

    private void RuleForCapacity()
    {
        RuleFor(x => x.Capacity)
            .GreaterThanOrEqualTo(0).WithMessage("Capacity must be zero or positive.");
    }
}
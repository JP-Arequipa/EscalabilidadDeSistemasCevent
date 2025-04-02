using CEventService.API.DTOs.User;
using CEventService.API.Services;
using FluentValidation;

namespace CEventService.API.Validations;

public class UserInputDtoValidator : AbstractValidator<UserInputDto>
{
    public UserInputDtoValidator(IUserService userService)
    {
        RuleForUserId(userService);
        RuleForName();
        RuleForLastName();
        RuleForEmail();
        RuleForPhoneNumber();
    }

    private void RuleForUserId(IUserService userService)
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("UserId is required.");
    }

    private void RuleForName()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.")
            .MaximumLength(50).WithMessage("Name must not exceed 50 characters.");
    }

    private void RuleForLastName()
    {
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last Name is required.")
            .MaximumLength(50).WithMessage("Last Name must not exceed 50 characters.");
    }

    private void RuleForEmail()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.")
            .MaximumLength(100).WithMessage("Email must not exceed 100 characters.");
    }

    private void RuleForPhoneNumber()
    {
        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Phone Number is required.")
            .Matches(@"^\+?[1-9]\d{1,14}$").WithMessage("Invalid phone number format.");
    }
}
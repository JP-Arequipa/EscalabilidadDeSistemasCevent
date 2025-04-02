
using NotificationService.Exceptions;

namespace NotificationService.Middlewares;
public class ErrorHandlingMiddleware : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch(ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch(Exception ex)
        {
            await HandleUnknownException(context, ex);
        }
        
    }

    private async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(new {message= ex.Message, details =ex.Details});
    }

    private async Task HandleUnknownException(HttpContext context, Exception ex)
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await context.Response.WriteAsJsonAsync(new {message= "An unknow exception happened", details =ex.Message});
    }
}
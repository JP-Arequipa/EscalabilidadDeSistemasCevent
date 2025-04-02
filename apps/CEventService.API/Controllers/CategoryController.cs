using AutoMapper;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;
namespace CEventService.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class CategoryController : BaseController<EventCategory, EventCategory, EventCategory, int>
{
    public CategoryController(IMapper mapper, ICategoryService categoryService)
        : base(mapper, categoryService)
    {
    }
}
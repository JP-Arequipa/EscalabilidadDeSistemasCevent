using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KeycloakWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet("kittens", Name = "GetKittens")]
        public IActionResult GetKittens()
        {
            return Ok("Kittens");
        }

        [HttpGet("doggys", Name = "GetDoggys")]
        public IActionResult GetDoggys()
        {
            return Ok("Scooby doo");
        }
    }
}

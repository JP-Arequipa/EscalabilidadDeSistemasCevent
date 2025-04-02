using AutoMapper;
using CEventService.API.DTOs.Activity;
using CEventService.API.Models;
using CEventService.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CEventService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventActivitiesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IActivityService _activityService;

        public EventActivitiesController(IMapper mapper, IActivityService activityService)
        {
            _mapper = mapper;
            _activityService = activityService;
        }

        [HttpGet("{eventId}/activities")]
        public async Task<ActionResult<IEnumerable<ActivityOutputDto>>> GetAllActivities(int eventId)
        {
            var activities = await _activityService.GetActivities(eventId);
            var activitiesDtoOutput = _mapper.Map<IEnumerable<ActivityOutputDto>>(activities);
            return Ok(activitiesDtoOutput);
        }

        [HttpGet("{eventId}/activities/{activityId}")]
        public async Task<ActionResult<ActivityOutputDto>> GetActivityById(int eventId, int activityId)
        {
            var activity = await _activityService.GetActivity(eventId, activityId);
            if (activity == null)return NotFound();
            var activityDtoOutput = _mapper.Map<ActivityOutputDto>(activity);
            return Ok(activityDtoOutput);
        }


        [HttpGet("{eventId}/activities/status")]
        public async Task<ActionResult<IEnumerable<ActivityOutputDto>>> GetActivitiesByStatus(int eventId, [FromQuery] int status)
        {
            var activities = await _activityService.GetActivitiesByStatus(eventId, status);
            var activitiesDtoOutput = _mapper.Map<IEnumerable<ActivityOutputDto>>(activities);
            return Ok(activitiesDtoOutput);
        }

        [HttpDelete("{eventId}/activities/{activityId}")]
        public async Task<ActionResult<ActivityOutputDto>> DeleteActivity(int eventId, int activityId)
        {
            var activity = await _activityService.DeleteActivity(eventId, activityId);
            var activityDtoOutput = _mapper.Map<ActivityOutputDto>(activity);
            return Ok(activityDtoOutput);
        }

        [HttpPut("{eventId}/activities/{activityId}")]
        public async Task<ActionResult<ActivityOutputDto>> UpdateActivity(int eventId, int activityId, ActivityInputDto activityInputDto)
        {
            var activity = _mapper.Map<Activity>(activityInputDto);
            activity.Id = activityId;
            var updatedActivity = await _activityService.UpdateActivity(eventId, activity);
            var updatedActivityDtoOutput = _mapper.Map<ActivityOutputDto>(updatedActivity);
            return Ok(updatedActivityDtoOutput);
        }

        [HttpPost("{eventId}/activities")]
        public async Task<ActionResult<ActivityOutputDto>> PostActivity(int eventId, ActivityInputDto activityInputDto)
        {
            var activity = _mapper.Map<Activity>(activityInputDto);
            var createdActivity = await _activityService.CreateNewActivity(eventId, activity);
            if (createdActivity == null) return BadRequest();
            return CreatedAtAction(nameof(GetActivityById), new { eventId = eventId, activityId = createdActivity.Id }, _mapper.Map<ActivityOutputDto>(createdActivity));
        }
    }
}

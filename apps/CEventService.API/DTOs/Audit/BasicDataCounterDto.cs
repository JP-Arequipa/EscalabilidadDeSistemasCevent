namespace DTOs.Audit;

public class BasicDataCounterDto
{
    public int TotalEvents { get; set; }
    public int? EventsCanceled { get; set; }
    public int? EventsPromoted { get; set; }
}
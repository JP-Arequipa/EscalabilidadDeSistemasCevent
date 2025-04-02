namespace ApiGateway;

public class RequestRouter(CustomServiceDiscovery serviceDiscovery, IHttpClientFactory httpClientFactory)
{
    private readonly HttpClient _httpClient = httpClientFactory.CreateClient();
    private static readonly Dictionary<string, int> _serviceIndices = new();

    public async Task<HttpResponseMessage> RedirectRequestAsync(string serviceName, string downstreamPath, HttpRequestMessage request, string queryString)
    {
        var serviceUri = await GetServiceUriAsync(serviceName);
        Console.WriteLine(new string('=', 50));
        Console.WriteLine($"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] >>> SERVICE USED: {serviceUri} <<<");
        Console.WriteLine(new string('=', 50));

        var downstreamUrl = BuildDownstreamUrl(serviceUri, downstreamPath, queryString);
        var downstreamRequest = CreateDownstreamRequest(request, downstreamUrl);

        return await SendDownstreamRequestAsync(downstreamRequest);
    }

    private async Task<string> GetServiceUriAsync(string serviceName)
    {
        var serviceUris = await serviceDiscovery.GetServiceUrisAsync(serviceName);
        if (serviceUris == null || serviceUris.Count == 0)
        {
            throw new Exception($"No instances found for service {serviceName}.");
        }

        return GetNextInstance(serviceUris, serviceName);
    }

    private string BuildDownstreamUrl(string serviceUri, string downstreamPath, string queryString)
    {
        return $"{serviceUri}/{downstreamPath}{queryString}";
    }

    private HttpRequestMessage CreateDownstreamRequest(HttpRequestMessage originalRequest, string downstreamUrl)
    {
        var downstreamRequest = new HttpRequestMessage(originalRequest.Method, downstreamUrl)
        {
            Content = originalRequest.Content
        };

        foreach (var header in originalRequest.Headers)
        {
            downstreamRequest.Headers.TryAddWithoutValidation(header.Key, header.Value);
        }

        return downstreamRequest;
    }

    private async Task<HttpResponseMessage> SendDownstreamRequestAsync(HttpRequestMessage downstreamRequest)
    {
        return await _httpClient.SendAsync(downstreamRequest);
    }
    
    private string GetNextInstance(List<string> instances, string serviceName)
    {
        if (!_serviceIndices.ContainsKey(serviceName))
            _serviceIndices[serviceName] = 0;

        var index = _serviceIndices[serviceName];
        var instance = instances[index % instances.Count];
        _serviceIndices[serviceName] = (index + 1) % instances.Count;

        return instance;
    }
}
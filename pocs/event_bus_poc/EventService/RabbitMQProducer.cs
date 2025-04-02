using RabbitMQ.Client;
using System;
using System.Text;

public class RabbitMQProducer
{
    private readonly string _hostname;
    private readonly string _queueName;
    private readonly IConnection _connection;
    private readonly IModel _channel;

    public RabbitMQProducer(string hostname = "localhost", string queueName = "eventQueue")
    {
        _hostname = hostname;
        _queueName = queueName;

        var factory = new ConnectionFactory() { HostName = _hostname };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        _channel.QueueDeclare(queue: _queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
    }

    public void SendMessage(string message)
    {
        var body = Encoding.UTF8.GetBytes(message);

        _channel.BasicPublish(exchange: "",
                              routingKey: _queueName,
                              basicProperties: null,
                              body: body);

        Console.WriteLine($"Event sent to queue {_queueName}: {message}");
    }

    public void Dispose()
    {
        _channel.Close();
        _connection.Close();
    }
}

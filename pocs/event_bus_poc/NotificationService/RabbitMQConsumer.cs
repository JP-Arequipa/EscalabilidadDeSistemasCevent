using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

public class RabbitMQConsumer
{
    private readonly string _hostname;
    private readonly string _queueName;
    private readonly IConnection _connection;
    private readonly IModel _channel;

    public RabbitMQConsumer(string hostname = "localhost", string queueName = "eventQueue")
    {
        _hostname = hostname;
        _queueName = queueName;

        var factory = new ConnectionFactory() { HostName = _hostname };
        _connection = factory.CreateConnection();
        _channel = _connection.CreateModel();
        _channel.QueueDeclare(queue: _queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
    }

    public void StartConsuming(Action<string> handleMessage)
    {
        var consumer = new EventingBasicConsumer(_channel);
        consumer.Received += (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            handleMessage(message);
        };

        _channel.BasicConsume(queue: _queueName, autoAck: true, consumer: consumer);

        Console.WriteLine($"Listening for events on {_queueName}...");
    }

    public void Dispose()
    {
        _channel.Close();
        _connection.Close();
    }
}

# POC Architecture - RabbitMQ Microservices Example

This repository contains two simple microservices that communicate with each other using **RabbitMQ** as the messaging system. The included services are:

- **EventService**: Produces events and sends them to a RabbitMQ queue.
- **NotificationService**: Consumes the events from the RabbitMQ queue and processes them.

## Setting Up RabbitMQ

1. **Start RabbitMQ in Docker**: Run the following command to start a RabbitMQ container with the management console enabled.

   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```

2. **Access the Management Console**: You can verify if RabbitMQ is working correctly by accessing the management console at:

   ```plain
   http://localhost:15672
   ```

   The default username and password are:
   - **Username**: guest
   - **Password**: guest

## Running the Microservices

### EventService

1. Navigate to the `EventService` directory and run the following command to execute the producer service that sends events to RabbitMQ:

   ```bash
   cd EventService
   dotnet run
   ```

   This service will produce an "event" and send it to the queue in RabbitMQ.

### NotificationService

1. In another terminal, navigate to the `NotificationService` directory and run the following command to execute the consumer service that listens for and processes events from the RabbitMQ queue:

   ```bash
   cd NotificationService
   dotnet run
   ```

   This service will consume events from the queue and display the event details in the console.

## Communication Flow

- **EventService**: Produces an event and sends it to RabbitMQ using the producer in `RabbitMQProducer.cs`.
- **NotificationService**: Consumes the events from RabbitMQ using the consumer in `RabbitMQConsumer.cs`.

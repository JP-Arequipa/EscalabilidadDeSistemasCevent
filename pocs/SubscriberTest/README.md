# Subscriber Test Project

This is a test project to simulate a subscriber service for the Event Bus API. This service subscribes to an event type (e.g., `OrderCreated`) and receives published events with dynamic data. When an event is received, it logs the event type and relevant data fields to the console.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup and Running](#setup-and-running)
- [Testing with Event Bus](#testing-with-event-bus)
- [Example Usage](#example-usage)

---

## Overview

This project acts as a sample subscriber to the Event Bus API, allowing you to validate how events are received and processed. It demonstrates how to dynamically handle events of different types without requiring predefined models for each event's data structure.

## Features

- **Event Subscription**: Listens for events published by the Event Bus API.
- **Dynamic Data Handling**: Uses `JObject` to handle flexible event data structures.
- **Logging**: Outputs event information to the console for verification.

---

## Project Structure

- **`EventsCallbackController`**: The main controller that listens for incoming event callbacks.
- **`EventWrapper.cs`**: A model representing the structure of an event with an `EventType` and `Data`.
- **`Program.cs`**: Configures and starts the application.
- **`SubscriptionService.cs`**: A service that registers the subscriber with the Event Bus (if applicable).
- **`appsettings.json`**: Configuration file for app settings.

---

## Prerequisites

- [.NET 5 or later](https://dotnet.microsoft.com/download/dotnet)
- [Event Bus API](https://github.com/your-repo/event-bus-api) running on `http://localhost:5233` (or other configured host)

---

## Setup and Running

### 1. Clone the Repository

```bash
git clone https://github.com/sofdev6-02-2024/Solidarios.git
cd pocs/subscriber-test
```

### 2. Install Dependencies

```bash
dotnet restore
```

### 3. Run the Application

```bash
dotnet run
```

The application will start on `http://localhost:5056` by default.

---

## Testing with Event Bus

To test the functionality of the subscriber, follow these steps to subscribe to an event and receive a published event.

### Step 1: Subscribe to an Event

1. Use Postman, Swagger, or curl to make a `POST` request to the Event Bus API's `/api/events/subscribe` endpoint.
2. Specify the `eventType` (e.g., `OrderCreated`) and the callback URL of this subscriber.

**Example Subscription Request**:
```bash
curl -X POST "http://localhost:5000/api/events/subscribe?eventType=OrderCreated" \
-H "Content-Type: application/json" \
-d "\"http://localhost:5056/api/events-callback\""
```

### Step 2: Publish an Event

1. Publish an event with type `OrderCreated` and dynamic data using the Event Bus API.
2. The Event Bus will forward this event to all subscribers for `OrderCreated`, including this test project.

**Example Publish Request**:
```bash
curl -X POST "http://localhost:5000/api/events/publish" \
-H "Content-Type: application/json" \
-d '{
  "eventType": "OrderCreated",
  "data": {
    "OrderId": "e3c0b2fa-efae-42f6-8e07-d303f6e3f021",
    "CreatedAt": "2024-11-11T10:00:00Z",
    "CustomerName": "John Doe",
    "TotalAmount": 99.99
  }
}'
```

### Step 3: Verify the Event Reception

Check the console output of the subscriber project. You should see logs similar to the following:

```plaintext
Received event of type: OrderCreated
Event Data: John Doe
```

---

## Example Usage

The `EventsCallbackController` processes incoming events as follows:

- **Event Type**: Displays the type of event received.
- **Event Data**: Outputs the `CustomerName` from the event data. You can modify the controller to log or process other fields as needed.

### Code Example

The `ReceiveEvent` method in `EventsCallbackController` processes incoming events:

```csharp
[HttpPost]
public IActionResult ReceiveEvent([FromBody] EventWrapper eventWrapper)
{
    Console.WriteLine(eventWrapper);
    var eventType = eventWrapper.EventType;
    var eventData = eventWrapper.Data;

    Console.WriteLine($"Received event of type: {eventType}");
    Console.WriteLine($"Event Data: {eventData["CustomerName"]}");

    return Ok("Event received and processed");
}
```

---

## Notes

- **Dynamic Handling**: This project uses `JObject` to handle flexible JSON data structures.
- **Testing**: For integration with the Event Bus API, make sure both the Event Bus and this subscriber are running and accessible.
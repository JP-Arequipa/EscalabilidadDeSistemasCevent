const eventDetailsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Ticket</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #f4f4f9;
        }
        .event-card {
            max-width: 800px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
            overflow: hidden;
        }
        .header {
            background-color: #085ce4;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 1.8rem;
        }
        .content {
            padding: 20px;
        }
        .event-info {
            margin: 16px 0;
            color: #333;
        }
        .event-info span {
            display: block;
            margin: 8px 0;
        }
        .qr-code {
            text-align: center;
            margin: 16px;
        }
        .qr-code img {
            width: 120px;
            height: 120px;
        }
        .qr-code .label {
            margin-top: 8px;
            font-size: 0.9rem;
            color: #666;
        }
        .event-image img {
            width: 100%;
            height: auto;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="event-card">
            <!-- Header Section -->
            <div class="header">
                <h1>Event Ticket</h1>
            </div>
            <!-- Event Details Section -->
            <div class="content">
                <div class="event-image">
                    <img src="{eventImage}" alt="{event}">
                </div>
                <h2>{event}</h2>
                <div class="event-info">
                    <span>📅 Date: {date}</span>
                    <span>🗺 Location: {location}</span>
                    <span>📍 Venue: {venue}</span>
                </div>
            </div>
            <!-- QR Code Section -->
            <div class="qr-code">
                <img src="{qrCode}" alt="QR Code">
                <div class="label">Use this QR code to enter the event. This is your ticket.</div>
            </div>
        </div>
    </div>
</body>
</html>
`;

export default eventDetailsHtml;

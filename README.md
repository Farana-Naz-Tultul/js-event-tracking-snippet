# JavaScript Event Tracking Snippet (Mock GTM-Style)

A lightweight JavaScript event tracking system built to simulate how marketing and programmatic advertising platforms (e.g., GTM-style tracking) collect, debug, and ingest client-side events.

This project demonstrates client-side tracking, debugging, and backend ingestion workflows commonly used in ad-tech platforms.

---

## Features

- Tracks:
  - Page views
  - Click events
  - Form submissions (conversions)
- Configuration-driven (Mock GTM-style rules)
- Simulated `dataLayer`
- Debug mode for troubleshooting
- Structured JSON event payloads
- Backend ingestion using Node.js and Express

---

## Tech Stack

- JavaScript (ES6)
- HTML
- Node.js
- Express
- Fetch API

---

## How It Works

1. Tracking rules are defined using a configuration object (trigger + selector)
2. User interactions are captured in the browser
3. Events are pushed to a simulated `dataLayer`
4. Structured payloads are sent to a backend endpoint
5. Backend logs events (simulating analytics ingestion)

This mirrors how real-world marketing tags and programmatic platforms work.

---

## Example Tracking Rule

```js
{
  name: "signup_click",
  trigger: "click",
  selector: "[data-track='signup_button']"
}

##Example Event Payload

{
  "eventType": "signup_click",
  "clientId": "demo-client-123",
  "url": "http://localhost:5500",
  "timestamp": "2025-01-01T12:00:00Z",
  "data": {
    "element": "BUTTON",
    "label": "signup_button"
  }
}

##Running the Project Locally
1. Install dependencies\
---

npm install express cors

##2. Start backend server
---
node server.js

##Server runs at:
---
http://localhost:3000

##3. Open frontend

Open index.html using VS Code Live Server

Append ?debug=1 to enable debug logging

Common Issues & Debugging

CORS errors: Resolved using Express CORS middleware

Events not firing: Ensure script loads after DOM elements

Origin issues: Avoid file://, use Live Server

Why This Project Matters

This project demonstrates:

Custom JavaScript tracking snippets

Client-side debugging and root cause analysis

GTM-style configuration-driven event tracking

Real-world ad-tech troubleshooting scenarios

Author

Farana Naz Tultul
---
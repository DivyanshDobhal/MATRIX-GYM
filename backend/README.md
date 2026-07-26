# MATRIX Gym Premium Website - Backend API

Production-ready backend API built with Node.js (Express), supporting secure user registration, Google sign-in validation via Firebase Admin SDK, JWT session token generation, rate limiting, Helmet security headers, compression, UUID request tracking, and Google Sheets database storage via Google Apps Script integration.

---

## Folder Structure

```text
server/
├── src/
│   ├── config/              # Credentials and client instances initialization
│   │      firebase.js       # Firebase Admin certificate cert config
│   │      googleSheets.js   # Axios instance targeting Apps Script endpoint
│   │
│   ├── controllers/         # Handles incoming HTTP payloads and return formats
│   │      auth.controller.js
│   │      registration.controller.js
│   │      contact.controller.js
│   │      membership.controller.js
│   │      trainer.controller.js
│   │      health.controller.js
│   │
│   ├── middleware/          # Verification checks, validation triggers, and error captures
│   │      auth.js           # JWT verification route guard
│   │      validation.js     # Request body schema checks
│   │      errorHandler.js   # Custom centralized format parser
│   │      notFound.js       # Catch-all endpoint handler
│   │
│   ├── routes/              # Express Router mapping to controllers
│   │      auth.routes.js
│   │      registration.routes.js
│   │      contact.routes.js
│   │      trainer.routes.js
│   │      membership.routes.js
│   │      health.routes.js
│   │
│   ├── services/            # Integrations with Firebase, JWT signing, and Google Apps Script
│   │      firebase.service.js
│   │      jwt.service.js
│   │      googleSheets.service.js
│   │
│   ├── validators/          # Zod schema definitions
│   │      registration.validator.js
│   │      contact.validator.js
│   │
│   ├── utils/               # Uniform response formatting and custom error structures
│   │      ApiResponse.js
│   │      ApiError.js
│   │
│   ├── app.js               # Express application builder (Middlewares and Routers)
│   └── server.js            # Node listener entrypoint and graceful shutdown listeners
│
├── Dockerfile               # Production container image config
├── docker-compose.yml       # Stack runner (Backend, MongoDB database, Frontend placeholder)
├── package.json             # Core dependency settings and scripts
├── .dockerignore            # Excludes dependencies from Docker context
├── .gitignore               # Excludes secrets and environment files from git
├── .env.example             # Template for required environment configurations
└── README.md                # System documentation
```

---

## Environment Variables

Create a `.env` file in the root of the `server/` directory based on the `.env.example` file:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Local network port the server listens on | `5000` |
| `NODE_ENV` | Mode setting (`development` or `production`) | `development` |
| `JWT_SECRET` | Secret key used to sign session JWTs | `a_highly_secure_random_string_32_chars` |
| `JWT_EXPIRES_IN` | Duration of JWT validity | `7d` |
| `CLIENT_URL` | Frontend client origin URL allowed in CORS | `http://localhost:5173` |
| `GOOGLE_SCRIPT_URL` | Google Apps Script Web App endpoint URL | `https://script.google.com/macros/s/xxxx/exec` |
| `FIREBASE_PROJECT_ID` | Firebase ID for Google Sign-In verification | `matrix-fitness` |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin SDK client email credential | `firebase-adminsdk@matrix-fitness.iam...` |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin SDK private certificate | `"-----BEGIN PRIVATE KEY-----\nMIIEvgIBA...` |
| `NVIDIA_API_KEY` | NVIDIA NIM completions API credential key | `nvapi-xxxxxx...` |
| `NVIDIA_BASE_URL` | Nvidia NIM completions API base URL | `https://integrate.api.nvidia.com/v1` |
| `NVIDIA_MODEL` | Llama instruct model target designation | `meta/llama-3.3-70b-instruct` |

---

## Installation & Running Locally

### Prerequisites
- Node.js 22 LTS
- NPM 10+

### Steps
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy environment template to `.env` and fill in secrets:
   ```bash
   cp .env.example .env
   ```
4. Start development server (supports Hot Reloading via nodemon):
   ```bash
   npm run dev
   ```
5. Test standard build checks:
   ```bash
   npm start
   ```

---

## Docker Setup

Deploy the entire stack containing backend, MongoDB, and frontend placeholder using Docker Compose:

1. Build and run containers in the background:
   ```bash
   docker compose up --build
   ```
2. Stop all running containers and wipe networks:
   ```bash
   docker compose down
   ```

The backend container compiles under `node:22-alpine` to maintain a lightweight image.

---

## API Documentation

Interactive API Documentation is available via Swagger UI. Once the server is running, navigate to:
* **Swagger Documentation**: [http://localhost:5000/api/docs](http://localhost:5000/api/docs)

### Endpoint Summary

All routes are versioned under `/api/v1` (except base paths and Swagger):

#### Base Endpoints
- **GET `/`**: Simple status banner showing backend is running.
- **GET `/health`**: Returns uptime, system status, timestamp, and API version.

#### Auth Routes
- **POST `/api/v1/auth/google`**: Receives `{ idToken }` from Firebase client, verifies credentials, and issues an internal MATRIX JWT token valid for 7 days.
- **POST `/api/v1/auth/guest`**: Generates a valid guest JWT token immediately for testing and local runs without Firebase integrations.
- **GET `/api/v1/auth/profile`** *(Protected)*: Header `Authorization: Bearer <JWT>`. Returns user profile details.

#### AI Coach Routes
- **POST `/api/v1/ai/chat`** *(Protected & Rate Limited)*: Header `Authorization: Bearer <JWT>`. Receives `{ message: "..." }` and returns `{ success: true, reply: "..." }` formatted in markdown according to fitness coach guidelines.

#### Business/Sheet Routes
- **POST `/api/v1/register`**: Receives member information `{ name, email, phone, membership, preferredTime }` and appends it to Google Sheets.
- **POST `/api/v1/contact`**: Receives inquiries `{ name, email, subject, message }` and appends it to a contact sheet.

#### Content Providers
- **GET `/api/v1/memberships`**: Returns price lists, features, and tiers for memberships.
- **GET `/api/v1/trainers`**: Returns information on trainers.

---

## Authentication Flow

1. **Client Sign-In**: Users sign in on the frontend using Google Sign-In (Firebase Client SDK).
2. **Token Exchange**: The client sends the raw Firebase ID token to the server at `/api/v1/auth/google`.
3. **Admin Verification**: The backend validates this token against Firebase Admin console credentials.
4. **JWT Issue**: If valid, the backend signs a custom server JWT containing user metadata (UID, email, name, avatar) and sends it to the client.
5. **Route Access**: The client attaches the JWT in the header (`Authorization: Bearer <JWT>`) to access protected resources.

---

## Google Sheets Apps Script Integration

The Google Sheets integration connects through a Google Apps Script Web App. 

### Apps Script Code (`code.gs`)
Configure this code inside your Google Sheets' Extensions -> Apps Script editor:

```javascript
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    let sheetName = "";
    let rowData = [];
    
    if (payload.type === 'registration') {
      sheetName = "Registrations";
      const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
      
      // Setup Headers if sheet is empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Name", "Email", "Phone", "Membership", "Preferred Time", "Timestamp"]);
      }
      
      rowData = [
        payload.name,
        payload.email,
        payload.phone,
        payload.membership,
        payload.preferredTime,
        payload.timestamp
      ];
      sheet.appendRow(rowData);
      
    } else if (payload.type === 'contact') {
      sheetName = "Contacts";
      const sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
      
      // Setup Headers if sheet is empty
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Name", "Email", "Subject", "Message", "Timestamp"]);
      }
      
      rowData = [
        payload.name,
        payload.email,
        payload.subject,
        payload.message,
        payload.timestamp
      ];
      sheet.appendRow(rowData);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false, 
        message: "Invalid event type."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true, 
      message: "Data recorded successfully in sheet: " + sheetName
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false, 
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

Deploy the script as a Web App:
1. Click **Deploy** -> **New deployment**.
2. Select type **Web app**.
3. Set Execute as **Me**, and Who has access **Anyone**.
4. Click Deploy and copy the **Web app URL** into the `.env` file under `GOOGLE_SCRIPT_URL`.

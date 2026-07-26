# MATRIX Fitness Platform

Welcome to the MATRIX Fitness Platform!

## Project Structure

This project is separated into two main directories:

- **frontend**: The client-side application built with React, Vite, TanStack Router, and TailwindCSS.
- **backend**: The server-side API built with Node.js, Express, and MongoDB.

## Running Locally

To run the full stack locally, you need to start both servers.

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```
The backend server will run on `http://localhost:5050`.

### 2. Start the Frontend Development Server

Open a new terminal window and run:

```bash
cd frontend
npm install
npm run dev -- --port 3000
```
The frontend will be available at `http://localhost:3000`.

## Features

- **Premium Authentication Dashboard**: Interactive split-screen login and registration powered by React Three Fiber 3D elements.
- **Biomechanical 3D Objects**: Immersive gym equipment icons and dynamic tooltips.
- **User Dashboard**: Hydration tracking, BMI calculators, and simulated AI chat components.
- **Google Sign-In**: Robust OAuth integration for fast account creation.

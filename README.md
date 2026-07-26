# 🏋️ MATRIX Fitness Platform

Welcome to the **MATRIX Fitness Platform**, a premium, state-of-the-art web application designed for modern fitness enthusiasts. Built with a focus on immersive 3D aesthetics, biomechanical tracking, and seamless user experiences.

---

## 🌐 Live Website

The platform is professionally hosted and accessible globally via Vercel:

- **Frontend (Live App):** [https://matrix-fitness-source.vercel.app](https://github.com/DivyanshDobhal/MATRIX-GYM)
- **Backend (Live API):** [https://server-ashy-rho.vercel.app](https://server-ashy-rho.vercel.app)

---

## ✨ Features

- **Premium Authentication Dashboard**: Interactive split-screen login and registration powered by React Three Fiber 3D elements and floating particles.
- **Google Sign-In**: Robust, one-click OAuth integration using Google Identity Services for fast account creation.
- **Biomechanical 3D Objects**: Immersive, gym-focused interactive equipment icons (Chrome Dumbbells, Olympic Barbells) with dynamic hover tooltips.
- **User Dashboard**: Personalized hydration tracking, BMI calculators, and interactive fitness metric visuals.
- **Matrix AI Co-Pilot**: Integrated conversational AI to answer fitness queries, suggest conditioning splits, and calculate macros.
- **Smooth Animations**: High-fidelity micro-interactions and scroll animations powered by Framer Motion.

---

## 🏗️ Project Structure

This project is organized as a monorepo separated into two main directories:

- **`/frontend`**: The client-side application built with React, Vite, TanStack Router, and TailwindCSS.
- **`/backend`**: The server-side REST API built with Node.js, Express, and MongoDB.

---

## 💻 Running Locally

To run the full stack locally on your machine, you need to start both servers.

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```
*The backend server will run on `http://localhost:5050`.*

### 2. Start the Frontend Development Server

Open a new terminal window and run:

```bash
cd frontend
npm install
npm run dev -- --port 3000
```
*The frontend will be available at `http://localhost:3000`.*

---

## 🛠️ Technology Stack

**Frontend:**
- React 18
- Vite & TanStack Router (SSR Support via Nitro)
- Tailwind CSS & Framer Motion
- React Three Fiber & Drei (3D Rendering)
- @react-oauth/google

**Backend:**
- Node.js & Express
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & Google OAuth Token Verification
- Firebase Admin & Google Auth Library

# 🧠 Task Management App – Backend (Node.js + Express + MongoDB)

This is the backend service for the Task Management App**, built with **Node.js**, **Express**, **MongoDB**, and **TypeScript**.  
It includes **JWT authentication**, **task CRUD APIs**, **AI-powered priority suggestions**, filtering, sorting, pagination, and a dashboard summary.

## 🚀 Features

### ✅ Core Features
- JWT-based Authentication  
  - User Signup  
  - User Login  
  - Protected Routes  
- Task Management (CRUD)
- MongoDB + Mongoose Models
- RESTful API Architecture (Controllers → Usecases → Routes → Models)

### 🤖 AI Integration (Bonus)
- Uses **OpenAI API (gpt-4o-mini)** to automatically analyze task description and suggest a priority:
  - `low`, `medium`, or `high`

### 📊 Dashboard Summary
- Total tasks
- Completed vs Pending

### 🔎 API Enhancements
- Filtering & Sorting  (latest, oldest, status, priority)
- Pagination (page + limit)

## 🔧 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB / Mongoose**
- **TypeScript**
- **OpenAI API**
- **JWT Authentication**

## ⚙️ Environment Variables

Create a `.env` file in backend root:

## ▶️ Running the Backend

- clone this project
- npm install
- npm run dev


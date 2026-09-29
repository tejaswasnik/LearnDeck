# LearnDeck

LearnDeck is a full-stack, modern Learning Management System (LMS) designed to bridge the gap between instructors and students. It provides a seamless platform for educators to publish courses, and for learners to discover, purchase, and consume educational content.

## Features

### For Students
* **Course Discovery:** Browse and search a rich catalog of courses.
* **Enrollments:** Secure payments via Razorpay for course access.
* **Interactive Player:** A dedicated course player for consuming video lectures and course material.
* **Progress Tracking:** Keep track of completed lectures.

### For Instructors
* **Course Creation:** Create, edit, and publish rich courses with detailed descriptions.
* **Lecture Management:** Upload videos, organize course structures, and set free previews.
* **Instructor Dashboard:** Monitor your published courses and student enrollments.

### For Administrators
* **User Management:** View, suspend, or update user roles (Student/Instructor/Admin).
* **Course Moderation:** Review newly created courses before they are published to the public.
* **Platform Analytics:** Real-time metrics on user growth, revenue, and active enrollments.
* **System Health:** Monitor backend services, database connections, and cache status.

---

## Tech Stack

**Frontend:**
* React 19 (via Vite)
* Redux Toolkit (State Management)
* Tailwind CSS (Styling)
* React Router v6

**Backend:**
* Node.js & Express
* MongoDB & Mongoose (Database)
* Redis (Caching)
* Passport.js (Google OAuth20) & JWT (Authentication)
* Razorpay (Payment Gateway)
* Nodemailer (Email Verification & Resets)
* ImageKit (Media storage/optimization)

**DevOps & Infrastructure:**
* Docker & Docker Compose (Containerization)
* AWS (EC2 / ECS / ECR / ALB Deployments)

---

## Prerequisites

Before you begin, ensure you have met the following requirements:
* **Node.js** (v18 or higher)
* **Docker** and **Docker Compose**
* A **MongoDB** database (Local or MongoDB Atlas)
* A **Redis** instance (Local or Redis Cloud)
* Cloud provider accounts for **Google Cloud** (OAuth), **Razorpay**, and **ImageKit**.

---

## Environment Variables

To run this project, you will need to add a `.env` file to the `Backend` directory containing the following:

```env
# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PURE_FRONTEND_URL=http://localhost:5173

# Database & Caching
MONGO_URI=mongodb+srv://<user>:<password>@cluster...
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_USERNAME=default
REDIS_PASSWORD=<your-redis-password>

# Authentication
JWT_SECRET=<your-super-secret-jwt-key>
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# Email Settings (Gmail)
GMAIL_USER=<your-gmail-address>
GMAIL_CLIENT_ID=<your-gmail-client-id>
GMAIL_CLIENT_SECRET=<your-gmail-client-secret>
GMAIL_REFRESH_TOKEN=<your-gmail-refresh-token>

# Third-Party Integrations
IMAGEKIT_PRIVATE_KEY=<your-imagekit-key>
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
```

You will also need a `.env` file in the `Frontend` directory:
```env
VITE_API_URL=http://localhost:3000/api
VITE_RAZORPAY_KEY_ID=<your-razorpay-key-id>
```

---

## Running Locally

### Option 1: Using Docker Compose (Recommended)
You can spin up the entire application stack (Frontend, Backend, MongoDB, Redis) using Docker.

1. Ensure your `.env` variables in `Backend/.env` point to the internal docker network (e.g., `MONGO_URI=mongodb://mongo:27017/learndeck` and `REDIS_URL=redis://redis:6379`).
2. Run the compose file from the root directory:
   ```bash
   docker-compose up --build
   ```
3. The application will be available at `http://localhost`.

### Option 2: Manual Setup

1. **Start the Backend:**
   ```bash
   cd Backend
   npm install
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

---

## Deployment (AWS)

This repository includes a multi-stage `Dockerfile` in the root directory that compiles the Vite frontend and bundles it into the backend's `/public` folder for a unified, production-ready image.

To deploy to AWS ECS/EC2:

1. Build the production image for AMD64 (AWS standard):
   ```bash
   docker buildx build --platform linux/amd64 -t learndeck:latest .
   ```
2. Tag and push to AWS ECR.
3. Deploy the container to AWS ECS.
4. Ensure the Application Load Balancer (ALB) health check points to the `/health` endpoint.

---

## License

This project is licensed under the MIT License.

# SubsTracker

SubsTracker is a backend application for managing user subscriptions. It allows users to sign up, log in, and manage their subscriptions. The application also sends email reminders for upcoming subscription payments.

## Tech Stack and Libraries

*   **Node.js**: JavaScript runtime environment
*   **Express.js**: Web framework for Node.js
*   **MongoDB**: NoSQL database
*   **Mongoose**: ODM for MongoDB
*   **JSON Web Token (JWT)**: For authentication
*   **bcryptjs**: For password hashing
*   **Nodemailer**: For sending emails
*   **Upstash Workflow**: For scheduling and running tasks
*   **Arcjet**: For security and rate limiting
*   **Day.js**: For date manipulation

## Functionalities

*   **User Authentication**:
    *   User signup
    *   User signin
*   **Subscription Management**:
    *   Create, read, update, and delete subscriptions
    *   Get all subscriptions for a user
*   **User Profile**:
    *   Get user profile
    *   Update user profile
    *   Delete user profile
*   **Email Reminders**:
    *   Send email reminders for upcoming subscription payments

## API Routes

All routes are prefixed with `/api/v1`.

### Authentication Routes

*   `POST /auth/signup`: Register a new user.
    *   **Request Body**: `{ "username": "testuser", "email": "test@example.com", "password": "password123" }`
*   `POST /auth/signin`: Sign in a user.
    *   **Request Body**: `{ "email": "test@example.com", "password": "password123" }`

### Subscription Routes

These routes require authentication.

*   `GET /user/subscriptions`: Get all subscriptions for the logged-in user.
*   `GET /subscriptions/:id`: Get a specific subscription by its ID.
*   `POST /subscriptions`: Create a new subscription.
    *   **Request Body**: `{ "name": "Netflix", "price": 15.99, "frequency": "monthly", "category": "entertainment", "startDate": "2025-08-10", "status": "active" }`
*   `PUT /subscriptions/:id`: Update a subscription by its ID.
*   `DELETE /subscriptions/:id`: Delete a subscription by its ID.

### User Routes

These routes require authentication.

*   `GET /users/profile`: Get the profile of the logged-in user.
*   `PUT /users/profile`: Update the profile of the logged-in user.

### Workflow Routes

*   `POST /workflows/send-reminders`: Trigger sending of email reminders for subscriptions due today. This is intended to be called by a scheduler (e.g., a cron job).

## Setup and Running the Project

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd SubsTracker
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** in the root directory and add the following environment variables:
    ```
    PORT=3000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    ARCJET_KEY=<your-arcjet-key>
    QSTASH_TOKEN=<your-qstash-token>
    ```
4.  **Start the server:**
    ```bash
    npm start
    ```
    Or for development with auto-reloading:
    ```bash
    npm run dev
    ```

# Work Scheduler

Work Scheduler is a web application that helps users organize their work schedules by adding, managing, and viewing events. The app supports recurring events and integrates with Google authentication for secure access.

## Features

- **User Authentication**: Secure login using Google OAuth.
- **Add Events**: Create events with title, start time, end time, and optional recurrence.
- **Recurring Events**: Add events that repeat weekly (e.g., every Monday or Friday).
- **Event List**: View a clean list of all your scheduled events.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma
- **Database**: SQLite (local development)
- **Authentication**: NextAuth.js (Google Provider)
- **UI/UX**: Material-inspired design with Tailwind CSS

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/work-scheduler.git
   cd work-scheduler
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**: Create a `.env` file in the root directory with the following content:
   ```env
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXTAUTH_SECRET=your-nextauth-secret
   ```

4. **Run database migrations**:
   ```bash
   npx prisma migrate dev
    ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Access the app**: Open your browser and navigate to [http://localhost:3000](http://localhost:3000).


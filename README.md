# HumaniZen - HR Management Dashboard

HumaniZen is a modern, responsive, and comprehensive Human Resource Management System (HRMS) dashboard built with React and Vite. It provides a centralized platform for managing employees, recruitment, payroll, time off, and more.

## 🚀 Features

-   **Dashboard Overview**: Real-time insights into employee statistics, job openings, and project performance.
-   **Employee Management**: Detailed employee profiles, performance tracking, and team management.
-   **Recruitment**: Manage job postings, candidate pipelines, and interview schedules.
-   **Payroll**: View payslips, salary breakdowns, and earnings summaries.
-   **Time & Attendance**: Track attendance logs, leave requests, and work schedules.
-   **Document Center**: Centralized repository for company policies and documents.
-   **Settings & Help Center**: User preferences and support resources.

## 🛠️ Tech Stack

-   **Frontend Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Charts**: [Recharts](https://recharts.org/)
-   **Icons**: [Material Symbols](https://fonts.google.com/icons)
-   **Routing**: [React Router](https://reactrouter.com/)

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project directory.
2.  **Install dependencies**:

    ```bash
    npm install
    ```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Sidebar, Header, etc.)
├── pages/            # Page components (Dashboard, Recruitment, Payroll, etc.)
├── App.jsx           # Main application component and routing setup
├── main.jsx          # Entry point
└── index.css         # Global styles and Tailwind imports
```

## 📚 Documentation & Storybook

We use **Storybook** for developing and documenting UI components in isolation.

### Running Storybook

To start the Storybook server and view component documentation:

```bash
npm run storybook
```

(Note: Ensure Storybook is initialized with `npx storybook@latest init` if not already set up).

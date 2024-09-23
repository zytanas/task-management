# Task Management Application

A simple task management application built using React for the frontend and Go for the backend. This app allows users to create, read, update, and delete tasks, providing an intuitive interface to manage daily activities.

## Features

- Add new tasks
- View all tasks
- Mark tasks as completed
- Delete tasks
- Responsive design for better usability

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Go (Golang), net/http package
- **CORS**: rs/cors library for handling cross-origin requests

## Getting Started

### Prerequisites

- Go install on your machine
- Node.js and npm installed on your machine

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/task-management.git
   cd task-management
2. **Backend Setup:**

- Navigate to the `backend` folder:
  ```
  cd backend
  
- Initialize the Go module:
    ```bash
    go mo init myserver
- Start the Go server:
    ```bash
    go run main.go
- The server will run on `http://localhost:8080`.
3. **Frontend Setup**
- Navigate to the `frontend` folder:
  ```bash
  cd frontend
- Install the necessary dependencies:
  ```bash
  npm install
- Start the React application:
  ```bash
  npm start
- The application will run on `http://localhost:3000`.

### Usage
1. Open your browser and navigate to http://localhost:3000.
2. Add a new task using the input field and the "Add Task" button.
3. Click on the checkbox to mark tasks as completed.
4. You can delete tasks by clicking the "Delete" button next to each task.

### Author
 Zytanas

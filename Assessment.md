## Project Overview:
### Database Structure:
### User Model:
- id: Primary key, unique identifier for the user.
- name: String, the name of the user.
- email: String, unique, used for user login.
- password: String, hashed password for authentication.
- createdAt: DateTime, timestamp for when the account was created.
- updatedAt: DateTime, timestamp for the last update to the account.



### Task Model:
- id: Primary key, unique identifier for the task.
- userId: Foreign key, references the id in the User model.
- title: String, the title of the task.
- description: String, a detailed description of the task.
- status: String, represents the current status of the task (e.g., 'pending', 'completed').
- dueDate: DateTime, the deadline for the task.
- createdAt: DateTime, timestamp for when the task was created.
- updatedAt: DateTime, timestamp for the last update to the task.
1. Application Type: Task Management System
2. Functionality:
- User Authentication (Signup/Login). JWT authentication must be provided. URLs must
be protected.
- Dashboard to display tasks. List of tasks for the logged-in user.
- Ability to create, read, update, and delete tasks. URLs must be protected by RBAC and
OBAC.
- Filter tasks based on status (e.g., completed, pending) and date (createdAt and
dueDate)
## Backend Requirements (Node.js):
1. API Endpoints:
    - User Authentication: Signup and Login
    - Task Management: Create, Retrieve, Update, Delete tasks
2. Database: Use any SQL or NoSQL database of your choice for storing user and task
information.
3. Testing: Write unit tests for your API endpoints.
## Frontend Requirements (React.js):
1. User Interface:
    - Login and Signup Pages.
    - Dashboard Page to display tasks with the ability to add, edit, and delete tasks
2. State Management: Utilize React Context API, Redux or any other state management
library for state management.
## Bonus Challenges:
1. Implement real-time updates using WebSockets or similar technologies.
2. Add a feature to assign tasks to different users and track progress.
3. Implement advanced filtering and sorting capabilities.
## Submission Guidelines:
1. Your code should be submitted via a GitHub repository.
2. Include a README file with setup instructions and any necessary documentation.
3. Ensure code quality by following best practices and including meaningful comments.
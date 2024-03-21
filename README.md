## Taskify Server

Taskify Server is the backend component of the Taskify project, responsible for handling tasks data and interactions with the MongoDB database.

### Technologies Used

- **Node.js**: The runtime environment for running the server-side JavaScript code.
- **Express.js**: A web application framework for Node.js used to build the RESTful API endpoints.
- **MongoDB**: A NoSQL database used for storing tasks data.
- **MongoDB Atlas**: Cloud-based MongoDB service used for database hosting.
- **dotenv**: A zero-dependency module for loading environment variables from a .env file into process.env.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing (CORS).
- **MongoDB Node.js Driver**: Official MongoDB driver for Node.js used for interacting with MongoDB from Node.js applications.

### Setup

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory of the project and add the following variables:

   ```
   DB_USER=<your-mongodb-username>
   DB_PASS=<your-mongodb-password>
   ```

4. Start the server:

   ```
   npm start
   ```

### API Endpoints

- **GET /tasks/:email**: Retrieves tasks for a specific user by email.
- **GET /ongoingTasks/:email**: Retrieves ongoing tasks for a specific user by email.
- **GET /completedTasks/:email**: Retrieves completed tasks for a specific user by email.
- **GET /individual/:id**: Retrieves an individual task by its ID.
- **POST /addTask**: Adds a new task.
- **PUT /updateTask/:id**: Updates a task by ID.
- **DELETE /deleteTask/:id**: Deletes a task by ID.
- **PUT /updateTaskStatus/:taskId**: Updates the status of a task by its ID.

### Contributing

Contributions are welcome! If you wish to contribute to the project, feel free to fork the repository, make your changes, and submit a pull request following the project's guidelines.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
### Taskify Client : [Checkout](https://github.com/nasimrifat101/taskify-client)
---
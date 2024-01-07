[The Assessment](./Assessment.md)

## Notes About Implementations

- There is only one token and it is only for the access. (No refresh token provided)
- The token is a JWT token and it stores only id of the user in its payload. We dont store username or email values in Token payload.

### Backend

- created with ts-node, nodemon, typescript, ts-jest without using any boilerplate or template.
- We check token in Authorization header. Bearer Token.
- used `mongoose` for db connection
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) is used for verify and sign token for user
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) is used for password encryption.
- [joi](https://www.npmjs.com/package/joi) is used for request body validations

#### APIS

- **PUBLIC APIS**
  - /api/auth/login (POST)
    - email and password are needed
  - /api/auth/signup (POST)
    - name, email and password are needed
- **AUTH NEEDED APIS**
  - /api/me (GET)
    - gives user information from token
  - /api/task (GET)
    - lists all tasks which are only belongs to actual user
  - /api/task (POST)
    - creates a task
  - /api/task/{id} (DELETE)
    - deletes a task by id
  - /api/task/{id}/status (PUT)
    - updates task's status value

### Tests

- we used [jest](https://www.npmjs.com/package/jest) and [ts-jest](https://www.npmjs.com/package/ts-jest)
- [supertest](https://www.npmjs.com/package/supertest) is a good test library for express apps. We can send a request to the app without listening a port

#### We have 2 different test implementation.

>With a test mongodb app which is working on the memory

```ts
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
export const startTestMongoDb = async () => {
  const mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();
  await mongoose.connect(url);

  // STOP FUNCTION That we can call it after our tests finished
  return async () => {
    await mongoose.disconnect();
    await mongo.stop();
  };
};
// IN SPEC FILE
describe("TEST API", () => {
  let app: Application;
  let stopFunctionForTestMongoDb: Function = null!;
  beforeAll(async () => {
    app = createApp(
      new UserServiceImplementation(),
      new TokenServiceImplementation(),
      new TaskServiceImplementation()
    );
    stopFunctionForTestMongoDb = await startTestMongoDb();
  });
  afterAll(async () => {
    await stopFunctionForTestMongoDb();
  });
});
```

> The other way is for the test implementation Mocking Services

- [test setup `setupTest.ts`](backend\tests\with-mock\setupTest.ts)
- [test with mock `login.spec.ts`](backend\tests\with-mock\login.spec.ts)

```ts
import { createApp } from "../../src/app";
export const createTestApp = () => {           // THE FUNCTION
  const taskService = {
    createTask: jest.fn(),
    getTasksByUserId: jest.fn(),
    updateStatus: jest.fn(),
  };
  ............
  return createApp(userService, tokenService, taskService);
};

/* ------------------------------ */

describe("login api", () => {
  let app: Application;
  let getUserByEmailAndPassword: jest.Func;
  beforeAll(() => {
    app = createTestApp();                     // THE FUNCTION
  });
});
```

### Frontend

- Redux is used as the state management tool with [@reduxjs/toolkit](https://redux-toolkit.js.org/) but without [rtk-query](https://redux-toolkit.js.org/rtk-query/overview)
- There is no Server Side filtering, sorting and pagination. These features are working on the Client Side only.

#### Routes

- [react-router-dom@v6](https://reactrouter.com) is used.
- [./frontend/src/router/index.tsx](./frontend/src/router/index.tsx)

```tsx
export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />, // This component navigates to Login page after credentials deleted.
  },
  {
    path: "/", // THIS PATH IS PROTECTED
    // Frontend creates a request to `/api/me` (GET) with TOKEN
    element: (
      // when we try to reach this route.
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <ListTasksPage />,
      },
      {
        path: "/add",
        element: <AddTaskPage />,
      },
    ],
  },
]);
```

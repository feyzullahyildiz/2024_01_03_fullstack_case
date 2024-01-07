import { Application } from "express";
import request from "supertest";
import { createApp } from "../../src/app";
import {
  UserServiceImplementation,
  TaskServiceImplementation,
  TokenServiceImplementation,
} from "../../src/service/implementation";
import { startTestMongoDb } from "./setupMongo";

const TIMEOUT = 5000;
describe("task api", () => {
  let app: Application;
  let stopTestMongoDb: Function = null!;
  beforeAll(async () => {
    app = createApp(
      new UserServiceImplementation(),
      new TokenServiceImplementation(),
      new TaskServiceImplementation()
    );
    stopTestMongoDb = await startTestMongoDb();
  }, TIMEOUT);
  afterAll(async () => {
    await stopTestMongoDb();
  }, TIMEOUT);

  let userToken: string = null!;
  it("should signup a user and login user", async () => {
    const email = "johndoe@gmail.com";
    const password = "123456789";
    await request(app).post("/api/auth/signup").send({
      name: "john doe",
      email,
      password,
    });
    const res = await request(app).post("/api/auth/login").send({
      email,
      password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
  });
  it("should list empty task", async () => {
    const res = await request(app)
      .get("/api/task")
      .auth(userToken, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });
  let addedTaskId: string = null!;
  it("should add task", async () => {
    const res = await request(app)
      .post("/api/task")
      .auth(userToken, { type: "bearer" })
      .send({
        title: "Task Title",
        description: "Task Desc",
        dueDate: "2035-01-01",
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data).toHaveProperty("title");
    expect(res.body.data).toHaveProperty("description");
    expect(res.body.data).toHaveProperty("status");
    expect(res.body.data).toHaveProperty("dueDate");
    expect(res.body.data).toHaveProperty("createdAt");
    expect(res.body.data).toHaveProperty("updatedAt");
    addedTaskId = res.body.data._id;
  });
  it("should list tasks", async () => {
    const res = await request(app)
      .get("/api/task")
      .auth(userToken, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toMatchObject([
      {
        _id: addedTaskId,
        title: "Task Title",
        description: "Task Desc",
        status: "pending",
        dueDate: "2035-01-01T00:00:00.000Z",
      },
    ]);
  });
  it("should delete added task", async () => {
    const res = await request(app)
      .delete(`/api/task/${addedTaskId}`)
      .auth(userToken, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("should list empty task", async () => {
    const res = await request(app)
      .get("/api/task")
      .auth(userToken, { type: "bearer" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });
});

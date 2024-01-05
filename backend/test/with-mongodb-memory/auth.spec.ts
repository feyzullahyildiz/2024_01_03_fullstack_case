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
describe("auth api", () => {
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
  it("should signup with foo@bar.com", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "foo bar",
      email: "foo@bar.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("_id");
    expect(res.body.user).toHaveProperty("name");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).not.toHaveProperty("password");
  });
  it("should signup with other@user.com with same name", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "foo bar",
      email: "other@user.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user).toHaveProperty("_id");
    expect(res.body.user).toHaveProperty("name");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).not.toHaveProperty("password");
  });
  it("should NOT signup with foo@bar.com", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "foo bar",
      email: "foo@bar.com",
      password: "12345678",
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body).toHaveProperty("message");
    expect(res.body).not.toHaveProperty("user");
    expect(res.body.message).toBe("UserAlreadyExistsError");
  });
  it("should test login api", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "foo@bar.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    userToken = res.body.token;
  });
});

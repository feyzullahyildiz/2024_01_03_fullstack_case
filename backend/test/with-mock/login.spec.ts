import { Application } from "express";
import request from "supertest";
import { User } from "../../src/db/User";
import { createTestApp } from "./setupTest";

describe("login api", () => {
  let app: Application;
  beforeAll(() => {
    app = createTestApp({
      getUserByEmailAndPassword: jest.fn(() => Promise.resolve(new User())),
    });
  });

  describe("check login api req body", () => {
    it("email is required", async () => {
      const res = await request(app).post("/api/auth/login").send({});
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`"email" is required`);
    });
    it("email must be a valid email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "foo",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`"email" must be a valid email`);
    });
    it("password is required", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "foo@bar.com",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(`"password" is required`);
    });
    it("password length must be at least 8 characters long", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "foo@bar.com",
        password: "1234",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        `"password" length must be at least 8 characters long`
      );
    });
  });

  it("should test login api", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "foo@bar.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

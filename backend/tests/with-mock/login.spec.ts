import { Application } from "express";
import request from "supertest";
import { User } from "../../src/db/User";
import { createTestApp } from "./setupTest";
import { TokenService } from "../../src/service";

describe("login api", () => {
  let app: Application;
  let getUserByEmailAndPassword: jest.Func;
  beforeAll(() => {
    getUserByEmailAndPassword = jest.fn(() => Promise.resolve(new User()));
    app = createTestApp({
      getUserByEmailAndPassword,
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
    const tokenService = app.get("tokenService") as TokenService;
    const stub = jest
      .spyOn(tokenService, "createToken")
      .mockReturnValue(Promise.resolve("STUBBED_TOKEN"));

    const res = await request(app).post("/api/auth/login").send({
      email: "foo@bar.com",
      password: "12345678",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    // `getUserByEmailAndPassword` is the function in UserService that we overrided that function with a jest function
    // We can check the function is called or not.
    expect(getUserByEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(getUserByEmailAndPassword).toHaveBeenCalledWith(
      "foo@bar.com",
      "12345678"
    );
    //it should override the tokenService's createToken function
    expect(res.body.token).toBe("STUBBED_TOKEN");
    stub.mockClear();
  });
});

import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";
import bcrypt from "bcrypt";

// TODO: test register new user
describe("POST /api/users", () => {
  // TODO: delete user after test
  afterEach(async () => {
    await UserTest.delete();
  });

  // TODO: test register new user if request is invalid
  it("should reject register new user if request is invalid", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      email: "",
    });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test register new user if request is valid
  it("should register new user", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      email: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      username: "test",
      email: "test",
    });
  });
});

// TODO: test login user
describe("POST /api/users/login", () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete user after test
  afterEach(async () => {
    await UserTest.delete();
  });

  // TODO: test login user if username and password is valid
  it("should be able to login", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.email).toBe("test");
    expect(response.body.data.token).toBeDefined();
  });

  // TODO: test login user if username is invalid
  it("should not be able to login if username is invalid", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "wrong",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test login user if password is invalid
  it("should not be able to login if password is invalid", async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

// TODO: test get user
describe("GET /api/users/current", () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete user after test
  afterEach(async () => {
    await UserTest.delete();
  });

  // TODO: test get user if token is valid
  it("should be able to get user", async () => {
    const response = await supertest(web).get("/api/users/current").set({
      "X-API-TOKEN": "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.email).toBe("test");
  });

  // TODO: test get user if token is invalid
  it("should not be able to get user if token is invalid", async () => {
    const response = await supertest(web).get("/api/users/current").set({
      "X-API-TOKEN": "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

// TODO: test update user
describe("PATCH /api/users/current", () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete user after test
  afterEach(async () => {
    await UserTest.delete();
  });

  // TODO: test update email
  it("should be able to update email", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        email: "new",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.email).toBe("new");
  });

  // TODO: test update password
  it("should be able to update password", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        password: "new",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);

    const user = await UserTest.get();
    expect(await bcrypt.compare("new", user.password)).toBe(true);
  });

  // TODO: test update user if request is invalid
  it("should reject update user if request is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        email: "",
        password: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test update user if token is invalid
  it("should reject update user if token is invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "wrong")
      .send({
        email: "new",
        password: "new",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

// TODO: test logout user
describe("DELETE /api/users/current", () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete user after test
  afterEach(async () => {
    await UserTest.delete();
  });

  // TODO: test logout user
  it("should be able to logout", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");

    const user = await UserTest.get();
    expect(user.token).toBe(null);
  });

  // TODO: test logout user if token is invalid
  it("should reject logout user if token is invalid", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { UserTest } from "./test-util";

// TODO: test register new user
describe("POST /api/users", () => {

  // TODO: delete user after test
  afterEach(async () => {
    await UserTest.delete();
  })

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
describe('POST /api/users/login', () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  })

  // TODO: delete user after test
  afterEach(async ()=>{
    await UserTest.delete();
  })

  // TODO: test login user if username and password is valid 
  it('should be able to login', async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.email).toBe("test");
    expect(response.body.data.token).toBeDefined();
  })

  // TODO: test login user if username is invalid
  it('should not be able to login if username is invalid', async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "wrong",
      password: "test",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })

  // TODO: test login user if password is invalid
  it('should not be able to login if password is invalid', async () => {
    const response = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "wrong",
    });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })

})

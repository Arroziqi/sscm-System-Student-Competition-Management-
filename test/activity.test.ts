import supertest from "supertest";
import { ActivityTest, UserTest } from "./test-util";
import { logger } from "../src/application/logging";
import { web } from "../src/application/web";

describe("POST /api/activity", () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete user after test
  afterEach(async () => {
    await ActivityTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to create activity", async () => {
    const response = await supertest(web)
      .post("/api/activity")
      .set("X-API-TOKEN", "test")
      .send({
        organization_name: "test",
        role: "test",
        description: "test",
        place: "test",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.organization_name).toBe("test");
    expect(response.body.data.role).toBe("test");
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.place).toBe("test");
    expect(response.body.data.start_date).toBeDefined();
    expect(response.body.data.end_date).toBeDefined();
  });

  it("should reject create activity if request is invalid", async () => {
    const response = await supertest(web)
      .post("/api/activity")
      .set("X-API-TOKEN", "test")
      .send({
        organization_name: "",
        role: "test",
        description: "test",
        place: "test",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create activity if token is invalid", async () => {
    const response = await supertest(web)
      .post("/api/activity")
      .set("X-API-TOKEN", "wrong")
      .send({
        organization_name: "test",
        role: "test",
        description: "test",
        place: "test",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/activity/:activityId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ActivityTest.create();
  });

  afterEach(async () => {
    await ActivityTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get activitiy", async () => {
    const activityId = (await ActivityTest.get()).id;

    const response = await supertest(web)
      .get(`/api/activity/${activityId}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.organization_name).toBe("test");
    expect(response.body.data.role).toBe("test");
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.place).toBe("test");
    expect(response.body.data.start_date).toBeDefined();
    expect(response.body.data.end_date).toBeDefined();
  });

  it("should reject get activity if id is invalid", async () => {
    const activityId = (await ActivityTest.get()).id;

    const response = await supertest(web)
      .get("/api/activity/" + activityId + 1)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject get activity if token is invalid", async () => {
    const activityId = (await ActivityTest.get()).id;

    const response = await supertest(web)
      .get(`/api/activity/${activityId}`)
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/activity", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ActivityTest.create();
  });

  afterEach(async () => {
    await ActivityTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get all activities", async () => {
    const response = await supertest(web)
      .get("/api/activity")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  });

  it("should reject get activities if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/activity")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/activity/:activityId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ActivityTest.create();
  });

  afterEach(async () => {
    await ActivityTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update activity", async () => {
    const activityId = (await ActivityTest.get()).id;
    const response = await supertest(web)
      .put(`/api/activity/${activityId}`)
      .set("X-API-TOKEN", "test")
      .send({
        organization_name: "new",
        role: "new",
        description: "new",
        place: "new",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.organization_name).toBe("new");
    expect(response.body.data.role).toBe("new");
    expect(response.body.data.description).toBe("new");
    expect(response.body.data.place).toBe("new");
    expect(response.body.data.start_date).toBeDefined();
    expect(response.body.data.end_date).toBeDefined();
  });

  it("should reject update activity if id is invalid", async () => {
    const activityId = (await ActivityTest.get()).id;
    const response = await supertest(web)
      .put("/api/activity/" + activityId + 1)
      .set("X-API-TOKEN", "test")
      .send({
        organization_name: "new",
        role: "new",
        description: "new",
        place: "new",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject update activity if token is invalid", async () => {
    const activityId = (await ActivityTest.get()).id;
    const response = await supertest(web)
      .put(`/api/activity/${activityId}`)
      .set("X-API-TOKEN", "wrong")
      .send({
        organization_name: "new",
        role: "new",
        description: "new",
        place: "new",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/activity/:activityId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ActivityTest.create();
  });

  afterEach(async () => {
    await ActivityTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to delete activity", async () => {
    const activityId = (await ActivityTest.get()).id;
    const response = await supertest(web)
      .delete(`/api/activity/${activityId}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject delete activity if id is invalid", async () => {
    const activityId = (await ActivityTest.get()).id;
    const response = await supertest(web)
      .delete("/api/activity/" + activityId + 1)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject delete activity if token is invalid", async () => {
    const activityId = (await ActivityTest.get()).id;
    const response = await supertest(web)
      .delete(`/api/activity/${activityId}`)
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
import supertest from "supertest";
import { ExperienceTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { workStatus } from "@prisma/client";

describe("POST /api/experience", () => {
  // TODO: Create user before test
  beforeEach(async () => {
    await UserTest.create();
  })

  // TODO: delete user & competition after test
  afterEach(async () => {
    await ExperienceTest.deleteAll();
    await UserTest.delete();
  })

  it("should be able to create experience", async () => {
    const response = await supertest(web)
      .post("/api/experience")
      .set("X-API-TOKEN", "test")
      .send({
        username: "test",
        company_name: "test",
        position: "test",
        status: "CONTRACT",
        description: "test",
        place: "test",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.company_name).toBe("test");
    expect(response.body.data.position).toBe("test");
    expect(response.body.data.status).toBe(workStatus.CONTRACT);
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.place).toBe("test");
    expect(response.body.data.start_date).toBeDefined();
    expect(response.body.data.end_date).toBeDefined();
  });

  it("should reject create experience if request is invalid", async () => {
    const response = await supertest(web)
      .post("/api/experience")
      .set("X-API-TOKEN", "test")
      .send({
        username: "test",
        company_name: "",
        position: "test",
        status: "CONTRACT",
        description: "test",
        place: "test",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  })

  it("should reject create experience if token is invalid", async () => {
    const response = await supertest(web)
      .post("/api/experience")
      .set("X-API-TOKEN", "wrong")
      .send({
        username: "test",
        company_name: "test",
        position: "test",
        status: "CONTRACT",
        description: "test",
        place: "test",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })

})

describe("GET /api/experience/:experienceId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ExperienceTest.create();
  })

  afterEach(async () => {
    await ExperienceTest.deleteAll();
    await UserTest.delete();
  })

  it("should be able to get all experience", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .get(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.company_name).toBe("test");
    expect(response.body.data.position).toBe("test");
    expect(response.body.data.status).toBe(workStatus.CONTRACT);
    expect(response.body.data.description).toBe("test");
    expect(response.body.data.place).toBe("test");
    expect(response.body.data.start_date).toBeDefined();
    expect(response.body.data.end_date).toBeDefined();
  })

  it("should reject get experience if token is invalid", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .get(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })

  it("should reject get experience if id is invalid", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .get(`/api/experience/${experienceId + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  })
})

describe("GET /api/experience", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ExperienceTest.create();
  })

  afterEach(async () => {
    await ExperienceTest.deleteAll();
    await UserTest.delete();
  })

  it("should be able to get all experience", async () => {
    const response = await supertest(web)
      .get("/api/experience")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
  })

  it("should reject get experience if token is invalid", async () => {
    const response = await supertest(web)
      .get("/api/experience")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })
})

describe("PUT /api/experience/:experienceId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ExperienceTest.create();
  })

  afterEach(async () => {
    await ExperienceTest.deleteAll();
    await UserTest.delete();
  })

  it("should be able to update experience", async () => {
    const experienceId = (await ExperienceTest.get()).id;
    const response = await supertest(web)
      .put(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "test")
      .send({
        username: "new",
        company_name: "new",
        position: "new",
        status: "INTERNSHIP",
        description: "new",
        place: "new",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.company_name).toBe("new");
    expect(response.body.data.position).toBe("new");
    expect(response.body.data.status).toBe(workStatus.INTERNSHIP);
    expect(response.body.data.description).toBe("new");
    expect(response.body.data.place).toBe("new");
    expect(response.body.data.start_date).toBeDefined();
    expect(response.body.data.end_date).toBeDefined();
  })

  it("should reject update experience if token is invalid", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .put(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "wrong")
      .send({
        username: "new",
        company_name: "new",
        position: "new",
        status: "INTERNSHIP",
        description: "new",
        place: "new",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })

  it("should reject update experience if id is invalid", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .put(`/api/experience/${experienceId + 1}`)
      .set("X-API-TOKEN", "test")
      .send({
        username: "new",
        company_name: "new",
        position: "new",
        status: "INTERNSHIP",
        description: "new",
        place: "new",
        start_date: new Date(),
        end_date: new Date(),
      });

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  })

  it("should reject update experience if request is invalid", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .put(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "test")
      .send({
        username: "new",
        company_name: "NEW",
        position: "new",
        status: 1,
        description: "new",
        place: "new",
        start_date: "07-05-2003",
        end_date: "07-05-2023",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  })
})

describe("DELETE /api/experience/:experienceId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await ExperienceTest.create();
  })

  afterEach(async () => {
    await ExperienceTest.deleteAll();
    await UserTest.delete();
  })

  it("should be able to delete experience", async () => {
    const experienceId = (await ExperienceTest.get()).id;
    const response = await supertest(web)
      .delete(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK")
  })

  it("should reject delete experience if token is invalid", async () => {
    const experienceId = (await ExperienceTest.get()).id;

    const response = await supertest(web)
      .delete(`/api/experience/${experienceId}`)
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  })
})

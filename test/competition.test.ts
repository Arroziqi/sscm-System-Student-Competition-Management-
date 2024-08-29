import supertest from "supertest";
import { CompetitionTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { Region, Category, Predicate } from "@prisma/client";
import { logger } from "../src/application/logging";

// TODO: test create competition
describe("POST /api/competitions", () => {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await CompetitionTest.deleteAll();
    await UserTest.delete();
  });

  // TODO: test create competition
  it("should be able to create competition", async () => {
    const response = await supertest(web)
      .post("/api/competitions")
      .set("X-API-TOKEN", "test")
      .send({
        name: "test",
        year: new Date(),
        region: Region.NATIONAL,
        category: Category.Design,
        predicate: Predicate.Participant,
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.year).toBeDefined();
    expect(response.body.data.region).toBe(Region.NATIONAL);
    expect(response.body.data.category).toBe(Category.Design);
    expect(response.body.data.predicate).toBe(Predicate.Participant);
  });

  // TODO: test create competition if request is invalid
  it("should reject create competition if request is invalid", async () => {
    const response = await supertest(web)
      .post("/api/competitions")
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        year: new Date(),
        region: Region.NATIONAL,
        category: Category.Design,
        predicate: Predicate.Participant,
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test create competition if token is invalid
  it("should reject create competition if token is invalid", async () => {
    const response = await supertest(web)
      .post("/api/competitions")
      .set("X-API-TOKEN", "wrong")
      .send({
        name: "test",
        year: new Date(),
        region: Region.NATIONAL,
        category: Category.Design,
        predicate: Predicate.Participant,
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/competitions/:competitionId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CompetitionTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await CompetitionTest.deleteAll();
    await UserTest.delete();
  });

  // TODO: test get competition
  it("should be able to get competition", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .get(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBeDefined();
    expect(response.body.data.name).toBe(competition.name);
    expect(response.body.data.year).toBeDefined();
    expect(response.body.data.region).toBe(competition.region);
    expect(response.body.data.category).toBe(competition.category);
    expect(response.body.data.predicate).toBe(competition.predicate);
  });

  // TODO: test get competition if token is invalid
  it("should reject get competition if token is invalid", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .get(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test get competition if id is invalid
  it("should reject get competition if id is invalid", async () => {
    const response = await supertest(web)
      .get("/api/competitions/2")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/competitions/:competitionId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CompetitionTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await CompetitionTest.deleteAll();
    await UserTest.delete();
  });

  // TODO: test update competition
  it("should be able to update competition", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .put(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "new",
        year: new Date(),
        region: Region.INTERNATIONAL,
        category: Category.DataScience,
        predicate: Predicate.FirstPlace,
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(competition.id);
    expect(response.body.data.name).toBe("new");
    expect(response.body.data.year).toBeDefined();
    expect(response.body.data.region).toBe(Region.INTERNATIONAL);
    expect(response.body.data.category).toBe(Category.DataScience);
    expect(response.body.data.predicate).toBe(Predicate.FirstPlace);
  });

  // TODO: test update competition if token is invalid
  it("should reject update competition if token is invalid", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .put(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "wrong")
      .send({
        name: "new",
        year: new Date(),
        region: Region.INTERNATIONAL,
        category: Category.DataScience,
        predicate: Predicate.FirstPlace,
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test update competition if request is invalid
  it("should reject update competition if request is invalid", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .put(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "test")
      .send({
        name: "",
        year: new Date(),
        region: Region.INTERNATIONAL,
        category: Category.DataScience,
        predicate: Predicate.FirstPlace,
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/competitions/:competitionId", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CompetitionTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await CompetitionTest.deleteAll();
    await UserTest.delete();
  });

  // TODO: test remove competition
  it("should be able to remove competition", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .delete(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  // TODO: test update competition if token is invalid
  it("should reject update competition if token is invalid", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .delete(`/api/competitions/${competition.id}`)
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  // TODO: test update competition if request is invalid
  it("should reject update competition if request is invalid", async () => {
    const competition = await CompetitionTest.get();
    const response = await supertest(web)
      .delete(`/api/competitions/${competition.id + 1}`)
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /api/competitions", () => {
  beforeEach(async () => {
    await UserTest.create();
    await CompetitionTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await CompetitionTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to get all competitions", async () => {
    const response = await supertest(web)
      .get("/api/competitions")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search competition using name", async () => {
    const response = await supertest(web)
      .get("/api/competitions")
      .query({
        name: "te",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search competition using year", async () => {
    const response = await supertest(web)
      .get("/api/competitions")
      .query({
        year: "2024",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search competition using region", async () => {
    const response = await supertest(web)
      .get("/api/competitions")
      .query({
        region: "NATIONAL",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search competition using category", async () => {
    const response = await supertest(web)
      .get("/api/competitions")
      .query({
        category: "Design",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

  it("should be able to search competition using predicate", async () => {
    const response = await supertest(web)
      .get("/api/competitions")
      .query({
        predicate: "Participant",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(1);
    expect(response.body.paging.current_page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.size).toBe(10);
  });

});

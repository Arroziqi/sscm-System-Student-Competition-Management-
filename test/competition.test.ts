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
  })
  
  // TODO: delete competition & user after test
  afterEach(async () => {
    await CompetitionTest.deleteAll();
    await UserTest.delete();
  });

  // TODO: test create competition
  it('should be able to create competition', async () => {
    const response = await supertest(web).post("/api/competitions").send({
      name: "test",
      year: new Date(),
      region: Region.NATIONAL,
      category: Category.Design,
      predicate: Predicate.Participant,
      username: "test",
    });

    console.log(process.env.DATABASE_URL);

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("test");
    expect(response.body.data.year).toBeDefined();
    expect(response.body.data.region).toBe(Region.NATIONAL);
    expect(response.body.data.category).toBe(Category.Design);
    expect(response.body.data.predicate).toBe(Predicate.Participant);
    expect(response.body.data.username).toBe("test");
  })
})
import supertest from "supertest";
import { PortfolioTest, UserTest } from "./test-util";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";

describe("POST /api/portfolio", ()=> {
  // TODO: create user before test
  beforeEach(async () => {
    await UserTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await PortfolioTest.deleteAll();
    await UserTest.delete();
  });
  
    it('should be able to create portfolio', async () => {
      const response = await supertest(web).post('/api/portfolio').set('X-API-TOKEN', 'test').send({
        full_name: 'test',
        place_of_birth: 'test',
        date_of_birth: new Date(),
        phone_number: '1234567892',
        domicile: 'test',
      })
  
      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.full_name).toBe('test')
      expect(response.body.data.place_of_birth).toBe('test')
      expect(response.body.data.date_of_birth).toBeDefined()
      expect(response.body.data.phone_number).toBe('1234567892')
      expect(response.body.data.domicile).toBe('test')
    })
  
    it('should be able to create portfolio using full request', async () => {
      const response = await supertest(web).post('/api/portfolio').set('X-API-TOKEN', 'test').send({
        full_name: 'test',
        place_of_birth: 'test',
        date_of_birth: new Date(),
        phone_number: '1234567892',
        domicile: 'test',
        summary: 'test',
        linkedin: 'test',
        github: 'test',
        instagram: 'test',
        website: 'test',
      })
  
      logger.debug(response.body)
      expect(response.status).toBe(200)
      expect(response.body.data.id).toBeDefined()
      expect(response.body.data.full_name).toBe('test')
      expect(response.body.data.place_of_birth).toBe('test')
      expect(response.body.data.date_of_birth).toBeDefined()
      expect(response.body.data.phone_number).toBe('1234567892')
      expect(response.body.data.domicile).toBe('test')
      expect(response.body.data.summary).toBe('test')
      expect(response.body.data.linkedin).toBe('test')
      expect(response.body.data.github).toBe('test')
      expect(response.body.data.instagram).toBe('test')
      expect(response.body.data.website).toBe('test')
    })

    it('should reject create portfolio if full_name is empty', async () => {
      const response = await supertest(web).post('/api/portfolio').set('X-API-TOKEN', 'test').send({
        full_name: '',
        place_of_birth: 'test',
        date_of_birth: new Date(),
        phone_number: '1234567892',
        domicile: 'test',
      })
  
      logger.debug(response.body)
      expect(response.status).toBe(400)
      expect(response.body.errors).toBeDefined()
    })
})

describe("GET /api/portfolio", ()=> {
  beforeEach(async () => {
    await UserTest.create();
    await PortfolioTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await PortfolioTest.deleteAll();
    await UserTest.delete();
  });

  it('should be able to get portfolio', async () => {
    const response = await supertest(web).get('/api/portfolio').set('X-API-TOKEN', 'test')

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.full_name).toBe('test')
    expect(response.body.data.place_of_birth).toBe('test')
    expect(response.body.data.date_of_birth).toBeDefined()
    expect(response.body.data.phone_number).toBe('1234567892')
    expect(response.body.data.domicile).toBe('test')
    expect(response.body.data.summary).toBe('test')
    expect(response.body.data.linkedin).toBe('test')
    expect(response.body.data.github).toBe('test')
    expect(response.body.data.instagram).toBe('test')
    expect(response.body.data.website).toBe('test')
  })
  it('should reject get portfolio if token is invalid', async () => {
    const response = await supertest(web).get('/api/portfolio').set('X-API-TOKEN', 'wrong')

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
})

describe("PUT /api/portfolio", ()=> {
  beforeEach(async () => {
    await UserTest.create();
    await PortfolioTest.create();
  });

  // TODO: delete competition & user after test
  afterEach(async () => {
    await PortfolioTest.deleteAll();
    await UserTest.delete();
  });

  it("should be able to update portfolio", async () => {
    const response = await supertest(web).put('/api/portfolio').set('X-API-TOKEN', 'test').send({
      full_name: 'new',
      place_of_birth: 'new',
      date_of_birth: new Date(),
      phone_number: '0987654321',
      domicile: 'new',
    })

    logger.debug(response.body)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBeDefined()
    expect(response.body.data.full_name).toBe('new')
    expect(response.body.data.place_of_birth).toBe('new')
    expect(response.body.data.date_of_birth).toBeDefined()
    expect(response.body.data.phone_number).toBe('0987654321')
    expect(response.body.data.domicile).toBe('new')
  })

  it("should reject update portfolio if token is invalid", async () => {
    const response = await supertest(web).put('/api/portfolio').set('X-API-TOKEN', 'wrong').send({
      full_name: 'new',
      place_of_birth: 'new',
      date_of_birth: new Date(),
      phone_number: '0987654321',
      domicile: 'new',
    })

    logger.debug(response.body)
    expect(response.status).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
})
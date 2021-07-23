import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";

import { generateBody, upScore, downScore } from "../factory/recommendationsFactory";
import { clearDatabase, closeConnection } from "../utils/database";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("should answer with status 400 when body is invalid", async () => {
    const body = {};
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });
  it("should answer with status 201 when given valid data", async () => {
    const body = generateBody();
    const response = await agent.post("/recommendations").send(
      {
        name: body.name, 
        youtubeLink: body.youtubeLink
      });
    expect(response.status).toEqual(201);
  });
});

describe("post /recommendations/:id/upvote", () => {
  it("should answer an updated object when an upvote is send", async () => {
    await upScore();
    const result = await supertest(app).post(`/recommendations/1/upvote`);
    expect(result.status).toEqual(200);
  });
});

describe("post /recommendations/:id/downvote", () => {
  it("should answer an updated object when a downvote is send", async () => {
    await downScore();
    const result = await supertest(app).post(`/recommendations/1/downvote`);
    expect(result.status).toEqual(200);
  });
});
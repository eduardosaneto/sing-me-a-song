import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";

import { generateBody, upScore, downScore, load, checkSongs, loadTop } from "../factory/recommendationsFactory";
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

describe("post /recommendations/random", () => {
  it("should answer with an object containing every recommendation randomically", async () => {
    await load();
    const response = await supertest(app).get(`/recommendations/random`);
    expect(response.body).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      youtubeLink: expect.any(String),      
      score: expect.any(Number)            
    }));
  });

  it("should answer 404 if there is no song recommended", async () => {
    await checkSongs();
    const response = await supertest(app).get(`/recommendations/random`);
    expect(response.status).toEqual(404);
  })
});

describe("get /recommendations/top/:amount", () => {
  it("should answer the list of recommendations", async () => {
    await loadTop();
    const result = await supertest(app).get(`/recommendations/top/3`);
    expect(result.body).toEqual([
      { 
        id: 1, 
        name: "Falamansa - Xote dos Milagres", 
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y", 
        score: 17 
      },
    ]);
  });
});
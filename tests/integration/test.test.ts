import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";

import { generateBody } from "../factory/recommendationsFactory";
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
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(201);
  });
});
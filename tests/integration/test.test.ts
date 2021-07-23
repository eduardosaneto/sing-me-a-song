import "../../src/setup";
import supertest from "supertest";
import app from "../../src/app";

import { insertSong } from "../factory/recommendationsFactory";
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
  function generateBody () {
    return {
      name: 'Falamansa - Xote dos Milagres',
      genresIds: [1, 2],
      link: 'https://www.youtube.com/watch?v=chwyjJbcs1Y'
    };
  }

  it("should answer with status 400 when body is invalid", async () => {
    const body = {};
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(400);
  });

  it("should answer with status 409 when there is alreadya song with the same link on the list", async () => {
    
    const body = generateBody();    
    await insertSong(body.name, body.link);
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(409);
  });

  it("should answer with status 201 when given valid data", async () => {
    const body = generateBody();
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(201);
  });
});

// describe("POST /sign-in", () => {
//   function generateBody ({ email, password } = {}) {
//     return {
//       email: email || faker.internet.email(),
//       password: password || "123456"
//     };
//   }

//   it("should answer with status 400 when body is invalid", async () => {
//     const body = {};

//     const response = await agent.post("/sign-in").send(body);

//     expect(response.status).toEqual(400);
//   });

//   it("should answer with status 401 when user doesnt exist", async () => {
//     const body = generateBody();

//     const response = await agent.post("/sign-in").send(body);

//     expect(response.status).toEqual(401);
//   });

//   it("should answer with status 401 when user exists but password is wrong", async () => {
//     const body = generateBody();

//     await createUser({ email: body.email, password: body.password.slice(1) });

//     const response = await agent.post("/sign-in").send(body);

//     expect(response.status).toEqual(401);
//   });

//   it("should answer with status 200 when user exists and password is correct", async () => {
//     const body = generateBody();

//     await createUser(body);

//     const response = await agent.post("/sign-in").send(body);

//     expect(response.status).toEqual(200);
//   });
// });
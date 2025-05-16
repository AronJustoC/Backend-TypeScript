import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import CreateServer from "../../src/server";
import { Express } from "express";
import userService from "../../src/services/user.service";

let app: Express;

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  app = CreateServer();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Authentication endpoint", () => {
  it("should return 401 for incorrect credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "itic.aron@gmail.com",
      password: "123456",
    });
    expect(res.status).toBe(401);
    expect(res.body.error?.message).toBe("invalid credentials");
  });

  it("Should return 200 for correct credentials", async () => {
    await userService.create({
      email: "itic.aron@gmail.com",
      password: "123456",
      name: "Aron",
    });
    const res = await request(app).post("/auth/login").send({
      email: "itic.aron@gmail.com",
      password: "123456",
    });
    expect(res.status).toBe(200);
  });
});

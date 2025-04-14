import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../app";

jest.mock("../src/api/v1/controllers/user.controller", () => ({
  getUsers: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  getUserById: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  createUser: jest.fn((_req: Request, res: Response) => res.status(201).send()),
  updateUser: jest.fn((_req: Request, res: Response) => res.status(200).send()),
  deleteUser: jest.fn((_req: Request, res: Response) => res.status(204).send()),
}));

const userController = require("../src/api/v1/controllers/user.controller");

jest.mock("../src/api/v1/middleware/auth.middleware", () =>
  jest.fn((_req: Request, _res: Response, next: NextFunction) => next())
);

jest.mock("../src/api/v1/middleware/authorize.middleware", () =>
  jest.fn(() => (_req: Request, _res: Response, next: NextFunction) => next())
);

describe("User Routes", () => {
  it("GET /api/v1/users should call controller", async () => {
    await request(app).get("/api/v1/users").set("Authorization", "Bearer mockedToken");
    expect(userController.getUsers).toHaveBeenCalled();
  });

  it("GET /api/v1/users/:id should call controller", async () => {
    await request(app).get("/api/v1/users/1").set("Authorization", "Bearer mockedToken");
    expect(userController.getUserById).toHaveBeenCalled();
  });

  it("POST /api/v1/users should call controller", async () => {
    await request(app).post("/api/v1/users").set("Authorization", "Bearer mockedToken").send({
      uid: "firebase-uid",
      name: "Test User",
      email: "test@example.com"
    });
    expect(userController.createUser).toHaveBeenCalled();
  });

  it("PUT /api/v1/users/:id should call controller", async () => {
    await request(app).put("/api/v1/users/1").set("Authorization", "Bearer mockedToken").send({
      name: "Updated Name"
    });
    expect(userController.updateUser).toHaveBeenCalled();
  });

  it("DELETE /api/v1/users/:id should call controller", async () => {
    await request(app).delete("/api/v1/users/1").set("Authorization", "Bearer mockedToken");
    expect(userController.deleteUser).toHaveBeenCalled();
  });
});
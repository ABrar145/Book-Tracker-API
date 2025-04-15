import { Request, Response } from "express";
import * as userController from "../src/api/v1/controllers/user.controller";
import * as userService from "../src/api/v1/services/user.service";

jest.mock("../src/api/v1/services/user.service");

describe("User Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  it("getUsers - returns list of users", async () => {
    const users = [{ id: "1", uid: "a", name: "John", email: "john@example.com", createdAt: new Date(), updatedAt: new Date() }];
    (userService.getUsers as jest.Mock).mockResolvedValue(users);
    await userController.getUsers(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  it("createUser - returns created user", async () => {
    const user = { id: "1", uid: "a", name: "New", email: "new@example.com", createdAt: new Date(), updatedAt: new Date() };
    (userService.createUser as jest.Mock).mockResolvedValue(user);
    req.body = user;
    await userController.createUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  it("updateUser - not found returns 404", async () => {
    (userService.updateUser as jest.Mock).mockResolvedValue(null);
    req.params = { id: "99" };
    req.body = { name: "Updated" };
    await userController.updateUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("deleteUser - returns success message", async () => {
    (userService.deleteUser as jest.Mock).mockResolvedValue({ id: "1" });
    req.params = { id: "1" };
    await userController.deleteUser(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "User deleted successfully" });
  });
});
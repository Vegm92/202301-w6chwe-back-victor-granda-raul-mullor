import Robot from "../../database/models/robotSchema";
import { getRobots } from "./robotsControllers";
import { requestMock, responseMock } from "../../mocks/robotMocks.js";
import type { Response, Request } from "express";

describe("Given a getRobots controllers", () => {
  describe("When it receives a response", () => {
    test("Then it should respond with status method with a 200 code", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue({}),
      } as Partial<Response>;
      const req = {};
      const next = jest.fn();
      const expectedStatusCode = 200;

      Robot.find = jest.fn().mockReturnValue({});

      await getRobots(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});

import Robot from "../../database/models/robotSchema";
import { getRobots } from "./robotsControllers";
import { requestMock, responseMock } from "../../mocks/robotMocks.js";
import type { Response, Request } from "express";

describe("Given a getRobots controllers", () => {
  describe("When it receives a response", () => {
    test("Then it should respond with status method with a 200 code", async () => {
      const req = {} as Request;
      const res = { status: jest.fn() } as Partial<Response>;
      const next = jest.fn();
      const statusCode = 200;

      Robot.find = jest.fn().mockImplementationOnce(() => ({
        exec: jest.fn().mockResolvedValue({
          stats: {
            speed: 5,
            endurance: 5,
            creationDate: "1980-10-2645:00:00.0000",
          },
          _id: "63efcf24773d3719e628a284",
          name: "Patatetas",
          image: "image.png",
        }),
      }));

      await getRobots(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(statusCode);
    });
  });
});

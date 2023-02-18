import Robot from "../../database/models/robotSchema";
import { getRobots } from "./robotsControllers";
import { requestMock, responseMock } from "../../mocks/robotMocks.js";
import { type Response } from "express";

describe("Given a getRobots controllers", () => {
  describe("When it receives a request and response", () => {
    test("Then it should respond with status code 200 and call its json method", async () => {
      const object = { robots: {} };
      Robot.find = jest.fn().mockReturnValue({});
      await getRobots(requestMock, responseMock as Response);

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith(object);
    });
  });
});

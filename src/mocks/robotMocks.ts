import { type Request, type NextFunction, type Response } from "express";

export const requestMock = {} as Request;
export const nextMock = jest.fn() as NextFunction;
export const responseMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  header: jest.fn(),
} as Partial<Response>;

import { Request, Response } from "express";

export type ApolloContext = {
  req: Request;
  res: Response;
  payload?: { userId: number; tokenVersion: number };
};

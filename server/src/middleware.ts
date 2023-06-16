import { MiddlewareFn } from "type-graphql";
import { ApolloContext } from "./types";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<ApolloContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authorized!");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    context.payload = payload as any;
  } catch (err) {
    console.log(err);
  }

  return next();
};

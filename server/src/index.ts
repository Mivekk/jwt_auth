import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";

(async () => {
  const app = express();
  const port = 4000;

  app.get("/", (_req, res) => {
    res.send("yoo");
  });

  const apolloServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String!
        }
    `,
    resolvers: {
      Query: {
        hello: () => "hello world",
      },
    },
  });

  await apolloServer.start();

  app.use("/graphql", cors(), json(), expressMiddleware(apolloServer));

  app.listen(port, () => {
    console.log("Server started on port", port);
  });
})();

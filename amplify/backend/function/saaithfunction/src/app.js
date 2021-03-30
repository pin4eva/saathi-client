const express = require("express");
// const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const schema = require("./typeDefs");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");

// declare a new express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(awsServerlessExpressMiddleware.eventContext());
// app.use(cors());
// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api", function (req, res) {
  res.json("Welcome home");
  // Add your code here
  // res.json({ success: "get call succeed!", url: req.url });
});

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  context: async ({ req, res }) => {
    const token = req.headers.authorization;

    return {
      res,
      req,
      token,
    };
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({
  app,
  path: "/api/graphql",
  cors: {
    origin: "*",
  },
});
app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;

const express = require("express");
// const mongoose = require("mongoose");
const redis = require("redis");
const { Client } = require("pg");
const os = require("os");
const PORT = process.env.PORT || 4000;

const app = express();

// connect to redis
const redisClient = redis.createClient({
  url: "redis://redis:6379",
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
  console.log(err);
});
redisClient.connect();

const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 5432;
const DB_HOST = "postgres";
const uri = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

const client = new Client({ connectionString: uri });
client
  .connect()
  .then(() => {
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.log(err);
  });

// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 27017;
// const DB_HOST = "mongo";
// const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get("/", (req, res) => {
  redisClient.set("products", "products...");
  res.send(
    "<h1>Hello from azure and custom domain?</h1><h2>Yes, from azure and custom domain</h2><h3>one more change</h3>" +
      `message from ${os.hostname}`
  );
});

app.get("/data", async (req, res) => {
  const products = await redisClient.get("products");
  res.send(`<h1>${products}</h1>  <h2>from redis</h2>`);
});

app.listen(PORT, () => {
  console.log(`Application is listening on port ${PORT}`);
});

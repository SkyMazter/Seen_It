// src/server.ts
import express, { Request, Response } from "express";
import userRouter from "./routes/users";
import postRouter from "./routes/posts";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize } from "./models";
import "dotenv/config";

const app: express.Application = express();
const port = 3001;
const origins= process.env.APP_URL;
app.use(express.json());
app.use(
  cors({
    origin: origins,// Allow only requests from this origin
    methods: ["GET", "POST", "PUT"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true,
  }),
);
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/uploads", express.static("uploads"));

sequelize
  .sync({ alter: true })
  .then((): void => {
    app.listen(port, (): void => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error): void => {
    console.error("Error synchronizing database:", error);
  });

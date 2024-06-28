import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    method: "*",
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

import authRouter from "./routes/auth.router.js";

app.use("/api/auth", authRouter);

export { app };

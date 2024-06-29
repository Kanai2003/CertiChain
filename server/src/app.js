import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configure CORS to allow all origins
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import authRouter from "./routes/auth.routes.js";
import offerLetterRouter from "./routes/offerLetter.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/offerLetter", offerLetterRouter);

export { app };

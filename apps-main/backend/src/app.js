import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: false,
    origin: FRONTEND_URL,
  })
);
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

export default app;

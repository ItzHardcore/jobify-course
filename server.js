import "express-async-errors";
import morgan from "morgan";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

// db and authenticate user
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authroutes.js";
import jobsRouter from "./routes/jobsroutes.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

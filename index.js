import cors from "cors";
import "dotenv/config";
import express from "express";
import "./config/connectDB.js"; //! connection with mongodb
import { configCloudinary } from "./config/cloudinaryConfig.js";
import { clientRoutes } from "./routes/user.routes.js";

const app = express();
//passing same instance of http with express and socket.io

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     credentials: true,
//   })
// );

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
configCloudinary();
app.use(clientRoutes);
app.use((error, req, res, next) => {
  console.log("in express error middleware", error, "in the end");
  const status = error.status || 500;
  const message = error.message || "server internal error";

  res.status(status).json({ status: "error", message: message });
});

app.listen(process.env.PORT, () =>
  console.log(`server is running on port ${process.env.PORT}`)
);

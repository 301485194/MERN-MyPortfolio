
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import qualificationRoutes from "./routes/qualification.routes.js";

const app = express();

app.use(helmet());
app.use(compress());
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
     origin: [
      "http://localhost:5173",
      "https://my-mern-portfolio.netlify.app"
    ],
    credentials: true,
  })
);

app.use("/", userRoutes);

// Contact routes – usually something like /api/contacts in the router
app.use("/", contactRoutes);


app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);

// Auth routes mounted under /auth
app.use("/auth", authRoutes);

// Error handler for express-jwt
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ error: err.name + ": " + err.message });
  }
  if (err) {
    console.log(err);
    return res.status(400).json({ error: err.name + ": " + err.message });
  }
  next();
});

export default app;

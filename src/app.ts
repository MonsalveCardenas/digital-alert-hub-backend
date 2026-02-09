import express, { Application, Request, Response } from "express";
import cors from "cors";
import passport from "passport";

import authRoutes from "./routes/authRoutes";
import alertRoutes from "./routes/alertRoutes";
import statsRoutes from "./routes/statsRoutes";
import profileRoutes from "./routes/profileRoutes";
import userRoutes from "./routes/userRoutes";
import roleRoutes from "./routes/roleRoutes";


import authGoogleRoutes from "./routes/authGoogle"; // <-- IMPORTANTE
import "./config/googleStrategy"; // <-- INICIALIZA PASSPORT GOOGLE

const app: Application = express();

// Configurar CORS para desarrollo y producción
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite default
  process.env.FRONTEND_URL || "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize()); // <-- NECESARIO PARA GOOGLE

// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/auth", authGoogleRoutes); // <-- AÑADE Google Login (línea 20)
app.use("/api/alerts", alertRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/profile", profileRoutes);

app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);


// ENDPOINT RAÍZ
app.get("/", (req: Request, res: Response) => {
  res.send("API DigitalAlertHub activa");
});

export default app;

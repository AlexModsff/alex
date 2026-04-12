import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { z } from "zod";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";
import bcrypt from "bcryptjs";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DOMPurify
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window as any);

async function startServer() {
  const app = express();
  const PORT = 3000;

  try {
    // Load Firebase Config
    const configPath = path.join(process.cwd(), "firebase-applet-config.json");
    if (!fs.existsSync(configPath)) {
      throw new Error("firebase-applet-config.json not found");
    }
    const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);

    // 1. Security Headers (Relaxed for AI Studio Iframe)
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "*"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
          styleSrc: ["'self'", "'unsafe-inline'", "*"],
          imgSrc: ["'self'", "data:", "*"],
          connectSrc: ["'self'", "*", "wss://*", "ws://*"],
          fontSrc: ["'self'", "data:", "*"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
          frameAncestors: ["'self'", "*"], 
        },
      },
      frameguard: false, 
      crossOriginEmbedderPolicy: false,
    }));

    // 2. CORS Configuration
    app.use(cors({
      origin: true, 
      credentials: true
    }));

    // 3. Logging
    app.use(morgan("dev"));

    app.use(express.json());

    // Health Check
    app.get("/api/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date().toISOString() });
    });

    // Input Validation Schemas
    const AuthSchema = z.object({
      username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guiones bajos"),
      password: z.string().min(6).max(100),
    });

    const sanitize = (str: string) => DOMPurify.sanitize(str);

    // 5. Secure Auth Routes
    app.post("/api/auth/register", async (req, res) => {
      console.log("Register request:", req.body?.username);
      try {
        const validated = AuthSchema.parse(req.body);
        const username = sanitize(validated.username);
        const password = validated.password;

        const userDocRef = doc(db, "users", username);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          return res.status(400).json({ error: "El nombre de usuario ya existe" });
        }

        const salt = await bcrypt.genSalt(12); 
        const passwordHash = await bcrypt.hash(password, salt);

        await setDoc(userDocRef, {
          username,
          passwordHash,
          createdAt: serverTimestamp(),
        });

        res.json({ success: true, username });
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: error.issues[0].message });
        }
        console.error("Register Error:", error);
        res.status(500).json({ error: "Error interno del servidor al registrar" });
      }
    });

    app.post("/api/auth/login", async (req, res) => {
      console.log("Login request:", req.body?.username);
      try {
        const validated = AuthSchema.parse(req.body);
        const username = sanitize(validated.username);
        const password = validated.password;

        const userDocRef = doc(db, "users", username);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const userData = userDoc.data();
        const isMatch = await bcrypt.compare(password, userData.passwordHash);

        if (!isMatch) {
          return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        res.json({ success: true, username });
      } catch (error: any) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ error: error.issues[0].message });
        }
        console.error("Login Error:", error);
        res.status(500).json({ error: "Error interno del servidor al iniciar sesión" });
      }
    });

    // 6. Vite Middleware / Static Files
    if (process.env.NODE_ENV !== "production") {
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    // Global Error Handler
    app.use((err: any, req: any, res: any, next: any) => {
      console.error("Express Global Error:", err);
      res.status(500).json({ error: "Error crítico del servidor" });
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    }).on('error', (err) => {
      console.error('Server failed to start:', err);
    });

  } catch (error) {
    console.error("Critical error during server initialization:", error);
  }
}

startServer();

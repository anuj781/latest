import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectToDb from "./config/db.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";

// Load environment variables
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Connect to MongoDB
connectToDb();

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration: allow specific origins including Vite's dev server origin
const allowedOrigins = [
  "http://localhost:5173",  // Vite React dev server
  "http://localhost:3000",  // React default dev server (if used)
  "https://yourdomain.com"  // Your production frontend domain
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like curl, Postman, mobile apps
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Body parser middleware
app.use(express.json());

// API routes
app.use("/enquiry", enquiryRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 9988;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

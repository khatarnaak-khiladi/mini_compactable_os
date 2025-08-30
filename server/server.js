// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs-extra";
import dotenv from "dotenv";
import path from "path";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2999;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const USERS_FILE = './users.json';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from current directory and client/public
app.use(express.static('.'));
app.use(express.static('./client/public'));

// ========== Load users from file ==========
let users = [];

// Load users from JSON file
async function loadUsers() {
  try {
    if (await fs.pathExists(USERS_FILE)) {
      users = await fs.readJSON(USERS_FILE);
      console.log(`✅ Loaded ${users.length} users from database`);
    }
  } catch (error) {
    console.log('📝 Creating new users database');
    users = [];
  }
}

// Save users to JSON file
async function saveUsers() {
  try {
    await fs.writeJSON(USERS_FILE, users, { spaces: 2 });
  } catch (error) {
    console.error('Error saving users:', error);
  }
}

// ========== JWT Middleware ==========
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// ========== Routes ==========

// Serve unified auth page as default
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'server/index.html'));
});

// Legacy routes for backwards compatibility
app.get("/login", (req, res) => {
  res.redirect('/');
});

app.get("/register", (req, res) => {
  res.redirect('/');
});

// Serve desktop page (protected)
app.get("/desktop", authenticateToken, (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client/public/desktop.html'));
});

// Get user profile (protected)
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ username: req.user.username });
});

// API endpoint for file listing
app.get("/api/files", authenticateToken, async (req, res) => {
  try {
    // Create user_files directory if it doesn't exist
    await fs.ensureDir('./user_files');
    const files = await fs.readdir('./user_files');
    const fileList = await Promise.all(files.map(async (file) => {
      const stats = await fs.stat(`./user_files/${file}`);
      return {
        name: file,
        type: stats.isDirectory() ? 'folder' : 'file',
        size: stats.size,
        modified: stats.mtime
      };
    }));
    res.json(fileList);
  } catch (err) {
    console.error('Error reading files:', err);
    res.json([]); // Return empty array if error
  }
});

// Register
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }
  
  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  await saveUsers(); // Save to file
  res.json({ message: "User registered successfully!" });
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ error: "Invalid username" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// List files in a folder
app.get("/files", authenticateToken, async (req, res) => {
  try {
    const files = await fs.readdir("./user_files");
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Error reading files" });
  }
});

// Create a new file
app.post("/files", authenticateToken, async (req, res) => {
  const { filename, content } = req.body;
  try {
    await fs.outputFile(`./user_files/${filename}`, content || "");
    res.json({ message: "File created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error creating file" });
  }
});

// Delete a file
app.delete("/files/:name", authenticateToken, async (req, res) => {
  try {
    await fs.remove(`./user_files/${req.params.name}`);
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting file" });
  }
});

// ========== Initialize and Start Server ==========
// Load users before starting server
loadUsers().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`✅ My_OS Server running on http://localhost:${PORT}`);
    console.log(`🔐 Login page: http://localhost:${PORT}`);
    console.log(`🏠 Desktop: http://localhost:${PORT}/desktop (requires authentication)`);
  });
  
  // ========== WebSocket Server ==========
  const wss = new WebSocketServer({ server });
  
  wss.on("connection", (ws) => {
    console.log("🔌 New WebSocket connection");
  
    ws.on("message", (msg) => {
      console.log("📩 WS message:", msg.toString());
      ws.send(`Echo: ${msg.toString()}`);
    });
  
    ws.send("Welcome to Web OS WebSocket server!");
  });
}).catch(error => {
  console.error('Failed to start server:', error);
});

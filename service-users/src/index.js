import express from "express";
import { db } from "../db.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

// Insert user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const [result] = await db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email]
  );
  res.json({ id: result.insertId, name, email });
});

// Get all users
app.get("/users", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM users");
  res.json(rows);
});

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(PORT, () => console.log(`Users service on ${PORT}`));

import express from "express";
import { db } from "../db.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002;

// Insert product
app.post("/products", async (req, res) => {
  const { name, price } = req.body;
  const [result] = await db.query(
    "INSERT INTO products (name, price) VALUES (?, ?)",
    [name, price]
  );
  res.json({ id: result.insertId, name, price });
});

// Get products
app.get("/products", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM products");
  res.json(rows);
});

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(PORT, () => console.log(`Products service on ${PORT}`));

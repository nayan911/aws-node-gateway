import express from "express";
import { db } from "../db.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3003;

// Insert order
app.post("/orders", async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  const [result] = await db.query(
    "INSERT INTO orders (user_id, product_id, quantity) VALUES (?, ?, ?)",
    [user_id, product_id, quantity]
  );

  res.json({ id: result.insertId, user_id, product_id, quantity });
});

// Fetch orders with JOINs
app.get("/orders", async (req, res) => {
  const [rows] = await db.query(`
    SELECT o.id, u.name AS user, p.name AS product, o.quantity, p.price
    FROM orders o
    JOIN users u ON o.user_id = u.id
    JOIN products p ON o.product_id = p.id
  `);

  res.json(rows);
});

app.get("/health", (req, res) => res.json({ status: "ok" }));
app.listen(PORT, () => console.log(`Orders service on ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const MONGO_URL = process.env.MONGO_URL || "mongodb://mongodb-svc:27017/cartdb";

mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Cart = mongoose.model("Cart", {
  item: String
});

app.post("/add", async (req, res) => {
  const item = new Cart({ item: req.body.item });
  await item.save();
  res.json({ message: "Item added" });
});

app.get("/", async (req, res) => {
  const items = await Cart.find();
  res.json(items);
});

app.listen(3000, () => console.log("Cart service running on port 3000"));
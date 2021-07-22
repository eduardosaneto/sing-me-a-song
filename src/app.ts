import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", (req, res) => {
  const { name, link } = req.body;
  res.send("OK!");
});

export default app;
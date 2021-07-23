import express from "express";
import cors from "cors";

import * as recommendationsController from "./controllers/recommendationsController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", recommendationsController.insert);
app.post("/recommendations/:id/upvote", recommendationsController.upScore);
app.post("/recommendations/:id/downvote", recommendationsController.downScore);
app.get("/recommendations/random", recommendationsController.load);
app.get("/recommendations/top/:amount", recommendationsController.loadTop);

export default app;
import express from "express";
import rungraph from "./ai/graph.ai.js"

const app = express();

app.post("/", async (req, res) => {
    const result = await rungraph("What is the capital of France?")
    res.json(result)

})

export default app;
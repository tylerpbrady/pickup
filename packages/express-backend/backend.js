// backend.js
import express from "express";
import cors from "cors";


import gameServices from "./models/game-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/games", async (req, res) => {
  try {
    const newGame = req.body
    gameServices.createGame(newGame).then(() => res.status(201).send(newGame))
  }
  catch {
    res.status(500)
  }
  
});

app.get("/games", async (req, res) => {
  const games = await gameServices.getGames()
  console.log(games)
  res.status(200).send({"users_list": games})
});

app.delete("/games/:id", async(req, res) => {
  const deletion = await gameServices.deleteGame(req.params.id)
  console.log(deletion)
  res.status(204);
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

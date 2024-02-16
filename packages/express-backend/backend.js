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
  const newGame = req.body
  gameServices.createGame(newGame).then(() => res.status(201).send(newGame))
  
});

app.get("/games", async (req, res) => {
  const games = await gameServices.getGames()
  res.status(200).send(games)
});

app.delete("/games", async(req, res) => {

});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

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
    const newGame = req.body;
    const createdGame = await gameServices.createGame(newGame);
    console.log("Game Created")
    res.status(201).json(createdGame); // Send the created game as part of the response
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/games", async (req, res) => {
  const games = await gameServices.getGames()
  console.log(games)
  res.status(200).send({"games_list": games})
});

app.delete("/games/:id", async (req, res) => {
  try {
    const deletedGame = await gameServices.deleteGame(req.params.id);
    console.log(deletedGame);

    // Check if the deletion was successful before sending a response
    if (deletedGame) {
      res.status(204).json(deletedGame); // Include deleted game in the response
    } else {
      res.status(404).send({ error: "Game not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

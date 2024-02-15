import mongoose from "mongoose";
import gameModel from "./game.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function findGameById(id) {
    return gameModel.findById(id);
}

function getGames() {
    return gameModel.find();
}

function getPlayersInGame(gameId) {
    return findGameById(gameId).populate("players")
}






import mongoose from "mongoose";
import gameModel from "./game.js";
import { MongoClient, ServerApiVersion } from 'mongodb';
import connectToDatabase from './atlas.js';


mongoose.set("debug", true);

connectToDatabase("PickupDatabase");

function findGameById(id) {
    return gameModel.findById(id);
}

function findGameByTitle(title) {
    return gameModel.find({title: title})
}

function getGames() {
    return gameModel.find();
}

function getPlayersInGame(gameId) {
    return findGameById(gameId).populate("players")
}

function createGame(game) {
    console.log('Trying to create game...');
    return collection.insertOne(game);
}

function deleteGame(id) {
    return gameModel.findByIdAndDelete(id)
}

export default {getGames, findGameById, getPlayersInGame, createGame, findGameByTitle, deleteGame}




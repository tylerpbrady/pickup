import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sport: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    maxPlayers: {
      type: Number,
      required: false,
    },
    time: {
      type: Date,
      required: true,
    },
    equipment: {
      type: String,
      required: true,
      trim: true,
    },
    skill: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Game = mongoose.model("Game", GameSchema);

export default Game;

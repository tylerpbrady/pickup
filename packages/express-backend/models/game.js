import mongoose from "mongoose";

const gameSchema = new mongoose.schema(

    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        hostId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
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
        players: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        dateTime: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
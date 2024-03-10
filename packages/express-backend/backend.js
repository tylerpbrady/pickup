// backend.js
import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";
import gameServices from "./models/game-services.js";
import auth from "./auth.js";
import connectToDatabase from "./models/atlas.js";

connectToDatabase();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send(process.env.API_URL);
});

app.get("/users", auth.authenticateUser, (req, res) => {
	const name = req.query.name;
	// const job = req.query.job;

	userServices.getUsers(name).then((result) => res.status(201).send(result));
});

app.post("/games", auth.authenticateUser, async (req, res) => {
	try {
		const newGame = req.body;
		const createdGame = await gameServices.createGame(newGame);
		console.log("Game Created");
		res.status(201).json(createdGame); // Send the created game as part of the response
	} catch (error) {
		res.status(500).send({ error: "Internal server error" });
	}
});

app.get("/games", auth.authenticateUser, async (req, res) => {
	// commenting out since our database is not up
	const games = await gameServices.getGames();
	res.status(200).send({ games_list: games });
	// res.status(200).send({});
});

app.delete("/games/:id", async (req, res) => {
	try {
		const deletedGame = await gameServices.deleteGame(req.params.id);

		// Check if the deletion was successful before sending a response
		if (deletedGame) {
			res.status(204).json(deletedGame); // Include deleted game in the response
		} else {
			res.status(404).send({ error: "Game not found" });
		}
	} catch (error) {
		res.status(500).send({ error: "Internal server error" });
	}
});

app.post("/users", auth.authenticateUser, (req, res) => {
	const userToAdd = req.body;
	userServices
		.addUser(userToAdd)
		.then((result) => res.status(201).send(result));
});

app.post("/login", auth.loginUser);
app.post("/signup", auth.registerUser);

app.listen(process.env.PORT || port, () => {
	console.log("REST API is listening.");
});

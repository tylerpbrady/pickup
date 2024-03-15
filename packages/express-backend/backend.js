// backend.js
import express from "express";
import cors from "cors";
import userServices from "./models/user-services.js";
import gameServices from "./models/game-services.js";
import auth from "./auth.js";
import connectToDatabase from "./models/atlas.js";

connectToDatabase();

const app = express();
const port = 8080;

app.use(cors());

app.use(express.json());

// will send back user info
app.get("/users/:name", auth.authenticateUser, (req, res) => {
	const name = req.params.name;

	userServices.getUser(name).then((result) => res.status(200).send(result));
});

// create a new game
app.post("/games", auth.authenticateUser, async (req, res) => {
	try {
		const newGame = req.body;
		const createdGame = await gameServices.createGame(newGame);
		res.status(201).json(createdGame); // Send the created game as part of the response
	} catch (error) {
		res.status(500).send({ error: "Internal server error" });
	}
});

// return all available games
app.get("/games", auth.authenticateUser, async (req, res) => {
	const games = await gameServices.getGames();
	res.status(200).send({ games_list: games });
});

// delete selected game from backend
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

// create a user
app.post("/users", auth.authenticateUser, (req, res) => {
	const userToAdd = req.body;
	userServices
		.addUser(userToAdd)
		.then((result) => res.status(201).send(result));
});

// updates user profile
app.post("/users/:name", auth.authenticateUser, (req, res) => {
	const name = req.params.name;
	const profile = req.body;
	userServices
		.updateUser(name, profile)
		.then(() => res.status(201).send(profile));
});

// end points for account creation and login
app.post("/login", auth.loginUser);
app.post("/signup", auth.registerUser);

// allows Azure to assign port number
app.listen(process.env.PORT || port, () => {
	console.log("REST API is listening.");
});

import gameServices from "../models/game-services.js";

test("setting up test harness", async () => {
  console.log(await gameServices.getGames());
});

// example game
// {
//     "title": "test",
//     "sport": "baseball",
//     "description": "this is a test",
//     "location": "the rec",
//     "maxPlayers": 5,
//     "equipment": "bats",
//     "skillLevel": "beginner friendly"
// }

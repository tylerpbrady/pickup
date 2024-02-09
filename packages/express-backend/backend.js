// backend.js
import express from "express";
import cors from "cors";


import userServices from "./models/user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"]; 

  try {
    const result = await userServices.getUsers(name, job);
    res.send({ users_list: result });
  } catch {
    console.log(error)
    res.status(500).send("An error occured in the server.");
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params["id"]; //or req.params.id
  const result = await userServices.findUserById(id);

  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    res.send({ users_list: result });
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const savedUser = await userServices.addUser(userToAdd);

  if (savedUser) {
    res.status(201).send({message: 'New user added', user: savedUser});
  } else {
    res.status(500).send("Failed to add user.");
  }
});

// Not sure if this is correct
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await userServices.deleteUserById(id);

    if (deletedUser !== null) {
      res.status(204).send();
    } else {
      res.status(404).send('User not found');
    }
  } catch {
    console.log(error)
    res.status(500).send("An error occured in the server.");
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

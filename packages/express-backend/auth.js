import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "./models/user-services.js";
import dotenv from "dotenv"

const creds = [];

function generateAccessToken(username) {
  dotenv.config()
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      },
    );
  });
}

export function registerUser(req, res) {
  const { username, password } = req.body; // from form
  if (!username || !password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else if (creds.find((c) => c.username === username)) {
    res.status(409).send("Username already taken");
  } else {
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        generateAccessToken(username).then((token) => {
          console.log("Token:", token);
          userServices.addUser({"username": username, "password": hashedPassword})
            .then((result) => {
              console.log(result)
              res.status(201).send({ token: token })
            });
        });
      });
  }
}

export function authenticateUser(req, res, next) {
  dotenv.config()
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export async function loginUser(req, res) {
  const { username, pwd } = req.body; // from form
  const retrievedUser = await userServices.getUser(username)
  if (!retrievedUser[0]) {
    // invalid username
    res.status(401).send("Unauthorized");
  } else {
    bcrypt
      .compare(pwd, retrievedUser[0].password)
      .then((matched) => {
        if (matched) {
          console.log("Sending access token");
          generateAccessToken(username).then((token) => {
            res.status(200).send({ token: token });
          });
        } else {
          // invalid password
          res.status(401).send("Unauthorized");
        }
      })
      .catch(() => {
        res.status(401).send("Unauthorized");
      });
  }
}

export default { registerUser, authenticateUser, loginUser };

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const challenges = require("../Mocks/challenges");
const users = require("../Mocks/users");

// Method to check the token's validity
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  let user = null;
  if (token === null || token === undefined)
    res.status(401).json({ error: "Authentication required" });
  else {
    try {
      user = jwt.verify(token, process.env.TokenSecret);
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError")
        res.status(403).json({ error: "Permission Denied" });
      else res.status(404).json({ error: "Not found" });
    }
  }
};

// A protected route to send back the challenges
router.get("/home", authenticateToken, (req, res, next) => {
  users.map((user) => {
    challenges.map((challenge) => {
      user.employeeID === challenge.createdBy
        ? (challenge["user"] = user.name)
        : "";
    });
  });
  res.status(200).json({ challenges });
});

// A protected route to send back the particular challenges created by a specific requesting user
router.get("/myChallenges", authenticateToken, (req, res, next) => {
  const myChallenges = challenges.filter((challenge) => {
    return challenge.createdBy === req.user.employeeID;
  });
  res.status(200).json({ myChallenges });
});

// A protected route to send back the challenges taken by a specific requesting user
router.get("/takenChallenges", authenticateToken, (req, res, next) => {
  const takenChallenges = challenges.filter((challenge) => {
    return challenge.takenBy.includes(req.user.employeeID);
  });
  res.status(200).json({ takenChallenges });
});

// A protected route to create a new challenge
router.post("/createChallenge", authenticateToken, (req, res, next) => {
  const challenge = req.body.challenge;
  req.body.challenge.challengeID = uuid();
  req.body.challenge.createdAt = Date.parse(new Date());
  req.body.challenge.createdBy = req.user.employeeID;
  req.body.challenge.voteCount = 0;
  req.body.challenge.takenBy = [];
  req.body.challenge.voters = [];
  req.body.challenge.collaboraters = [];
  try {
    challenges.push(req.body.challenge);
    res.status(200).json({ message: "Created a new challenge" });
  } catch (error) {
    res.status(400).json({ error: "Could not create the challenge" });
  }
});

// A protected route to accept a particular challenge by the requesting user
router.post("/takeChallenge", authenticateToken, (req, res, next) => {
  try {
    challenges.forEach((challenge) => {
      if (challenge.challengeID === req.body.challengeID) {
        if (challenge.takenBy.includes(req.user.employeeID))
          res
            .status(400)
            .json({ error: "Already you have taken up this challenge" });
        else if (challenge.createdBy === req.user.employeeID) {
          res.status(400).json({
            error:
              "Creator of the challenge will not be allowed to participate in the challenge they created",
          });
        } else {
          challenge.takenBy.push(req.user.employeeID);
          res.status(200).json({ message: "Let's crack the challenge" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

// A protected route to handle the voting functionality of a challenge
router.post("/vote", authenticateToken, (req, res, next) => {
  console.log(req.body.challengeID);
  try {
    challenges.forEach((challenge) => {
      if (challenge.challengeID === req.body.challengeID) {
        if (challenge.voters.includes(req.user.employeeID)) {
          const indexValue = challenge.voters.indexOf(req.user.employeeID);
          challenge.voters.splice(indexValue, 1);
          challenge.voteCount -= 1;
          res.sendStatus(200);
        } else if (challenge.createdBy === req.user.employeeID) {
          res.status(400).json({
            error:
              "Creator of the challenge will not be allowed to vote the challenge they created",
          });
        } else {
          challenge.voters.push(req.user.employeeID);
          challenge.voteCount += 1;
          res.sendStatus(201);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

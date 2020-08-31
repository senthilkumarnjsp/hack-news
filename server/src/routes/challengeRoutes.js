const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");

const challenges = require("../Mocks/challenges");
const users = require("../Mocks/users");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(token);
  let user = null;
  if (token === null || token === undefined)
    res.status(401).json({ error: "Authentication required" });
  else {
    try {
      user = jwt.verify(token, process.env.TokenSecret);
      req.user = user;
      console.log(`User found${user}`);
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError")
        res.status(403).json({ error: "Permission Denied" });
      else res.status(404).json({ error: "Not found" });
    }
  }
};

router.get("/", (req, res, next) => {
  //   res.send("Welcome to our app");
  res.status(200).json({ users, challenges });
  // res.status(200).json({ UUID: uuid() });
});

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

router.get("/myChallenges", authenticateToken, (req, res, next) => {
  const myChallenges = challenges.filter((challenge) => {
    return challenge.createdBy === req.user.employeeID;
  });
  res.status(200).json({ myChallenges });
});

router.get("/takenChallenges", authenticateToken, (req, res, next) => {
  const takenChallenges = challenges.filter((challenge) => {
    return challenge.takenBy.includes(req.user.employeeID);
  });
  res.status(200).json({ takenChallenges });
});

router.post("/createChallenge", authenticateToken, (req, res, next) => {
  const challenge = req.body.challenge;
  req.body.challenge.challengeID = uuid();
  req.body.challenge.createdAt = Date.parse(new Date());
  req.body.challenge.createdBy = req.user.employeeID;
  req.body.challenge.voteCount = 0;
  req.body.challenge.takenBy = [];
  req.body.challenge.voters = [];
  req.body.challenge.collaboraters = [];
  console.log(`The challenge data ${req.body.challenge}`);
  try {
    /*
      var msec = Date.parse(new Date());
var d = new Date(msec);
document.getElementById("demo").innerHTML = msec;
      */
    challenges.push(req.body.challenge);
    res.status(200).json({ message: "Created a new challenge" });
  } catch (error) {
    res.status(400).json({ error: "Could not create the challenge" });
  }
});

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

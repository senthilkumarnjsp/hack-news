const userRoute = require("express").Router();
const jwt = require("jsonwebtoken");

const users = require("../Mocks/users");

const findUser = (empID) => {
  let emp = null;
  for (let index = 0; index < users.length; index++) {
    if (users[index].employeeID === empID) {
      emp = users[index];
      const payload = {
        employeeID: users[index].employeeID,
        name: users[index].name,
      };
      const refreshToken = generateToken(payload);
      users[index].refreshToken = refreshToken;
      break;
    }
  }
  return emp;
};

const generateToken = (payload, expiration = null) => {
  const options = expiration ? { expiresIn: expiration } : null;
  const token = jwt.sign(payload, process.env.TokenSecret, options);
  return token;
};

userRoute.post("/login", (req, res, next) => {
  const user = findUser(req.body.empID);
  if (user === null)
    res.status(403).json({ message: "Could not find the employee ID" });
  else {
    const { employeeID, name } = user;
    const payload = { employeeID, name };
    const authToken = generateToken(payload, "3h");
    res.status(200).json({ payload, authToken });
  }
});

module.exports = userRoute;

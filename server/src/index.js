const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

const userRoute = require("./routes/authRoute");
const challengeRoutes = require("./routes/challengeRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());

app.use("/", userRoute);
app.use("/api", challengeRoutes);

app.get("/", (req, res, next) => {
  res.send("App is working");
});

app.listen(8000);

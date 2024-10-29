const express = require("express");
const { handleRegistration, handlelogin } = require("../controllers/auth");

//verify the sessionId
const { verifySessionId } = require("../services/generatesession");

const validator = require("../middlewares/authvalidators");
const { authregistervalidator } = require("../validators/auth");

//verify token
const { verifyToken } = require("../services/generateToken");

const authRouter = express.Router();

authRouter
  .route("/user/register")
  .get((req, res) => {
    res.send("Register page");
  })
  .post(validator(authregistervalidator), handleRegistration);

authRouter
  .route("/user/login")
  .get((req, res) => {
    res.send("Login page");
  })
  .post(handlelogin);

//user verification on reload
authRouter.route("/user/verify").post(async (req, res) => {
  const sessionId = req.body.sessionId;
  if (!sessionId) {
    console.log("no id present");
    return res.status(401).json({
      valid: false,
      msg: "No Session Id Provided",
    });
  }
  // console.log(sessionId)
  const token = req.headers.authorization.split(" ")[1];
  const tokenResponse = await verifyToken(token);
  if (tokenResponse) {
    const userId = tokenResponse.user.id;
    const sessionResponse = verifySessionId(sessionId, userId);
    if (sessionResponse.sessionId) {
      res.status(200).json({
        valid: true,
      });
    } else {
      res.status(401).json({
        valid: false,
        msg: sessionResponse?.message || "Session Id is not valid",
      });
    }
  } else {
    res.status(401).json({
      valid: false,
      msg: "Invalid Token",
    });
  }
});

module.exports = authRouter;

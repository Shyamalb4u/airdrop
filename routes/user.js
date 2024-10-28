const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();
router.post("/addSocial/:id/:typ", userController.handleSocial);
router.post("/touch/:id", userController.handleTouch);
router.get("/getUser/:id", userController.getUser);
router.get("/getall", userController.getall);
router.get("/getLeaders", userController.getLeaders);
router.post("/signup", userController.signup);
router.post("/touchtap/:id/:score", userController.handleTouchTap);

module.exports = router;

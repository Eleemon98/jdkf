const Express = require("express");
const passport = require("passport");
const { register, login, logout } = require('../controllers/auth');
const db = require("../connect");

const router = Express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
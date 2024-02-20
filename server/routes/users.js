const Express = require("express");
const { getUser, updateUser } = require("../controllers/user");

const router = Express.Router();

router.get("/find/:userId", getUser);
router.put("/", updateUser);


module.exports = router;
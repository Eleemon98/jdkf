const Express = require("express");
const { getLikes, addLike, deleteLike} = require("../controllers/like");

const router = Express.Router();

router.get("/", getLikes);
router.post("/", addLike);
router.delete("/", deleteLike);

module.exports = router;
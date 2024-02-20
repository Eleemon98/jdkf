const Express = require("express");
const { getComments, addComment, deleteComment, } = require("../controllers/comment");

const router = Express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);

module.exports = router;
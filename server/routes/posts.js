const Express = require("express");
const { getPosts, addPost, deletePost } = require("../controllers/post");

const router = Express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);

module.exports = router;
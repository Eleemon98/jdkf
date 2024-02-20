const db = require("../connect");
const jwt = require("jsonwebtoken");

exports.getLikes = (req, res) => {
    const q = "SELECT userId FROM likes WHERE postId = ?";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return req.status(200).json(data.map(like=>like.userId));
    });
}

exports.addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증 불가");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";
        const values = [
            userInfo.indexOf, req.body.postId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("게시물의 좋아요를 눌렀소.");
        });
    });
};

exports.deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("신분인증 불가");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not Valid!");

        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

        db.query(q, [userInfo.id, req.query.postId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("게시물의 좋아요를 없앴소.");
        });
    });
};
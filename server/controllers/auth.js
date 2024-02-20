const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../connect");
const passport = require('passport');

// 회원가입 컨트롤러
exports.register = async (req, res) => {
    try {
        // 회원이 이미 존재하는지 확인
        const existingUserQuery = "SELECT * FROM users WHERE username = ?";
        db.query(existingUserQuery, [req.body.username], async (err, data) => {
            console.log(err);
            if (err) return res.status(500).json(err);
            if (data.length) return res.status(404).json("이미 가입된 사용자입니다.");

            // 비밀번호 해시 생성
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            // 회원가입 정보 삽입
            const insertUserQuery = "INSERT INTO users (username, email, password, nickname) VALUES (?, ?, ?, ?)";
            db.query(insertUserQuery, [req.body.username, req.body.email, hashedPassword, req.body.nickname], (err, data) => {
                console.log(err);
                if (err) return res.status(500).json(err);
                return res.status(200).json("회원가입이 완료되었습니다.");
            });
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

// 로그인 컨트롤러
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(err);
        if (err) return res.status(500).json(err);
        if (!user) return res.status(404).json(info.message);

        req.logIn(user, (err) => {
            console.log(err);
            if (err) return res.status(500).json(err);

            const token = jwt.sign({ id: user.id }, "secretkey");
            const { password, ...others } = user;
            return res.cookie("accessToken", token, { httpOnly: true }).status(200).json(others);
        });
    })(req, res, next);
};

// 로그아웃 컨트롤러
exports.logout = (req, res) => {
    req.logout();
    res.clearCookie("accessToken").status(200).json("로그아웃 되었습니다.");
};

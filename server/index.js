const Express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const db = require('./connect');
const session = require('express-session');
const passportConfig = require('./passport');
// const nunjucks = require('nunjucks');

dotenv.config();
const app = Express();
passportConfig();

app.set('port', process.env.PORT || 3050);
// app.set('view engine', 'html');
// nunjucks.configure('views', {
//     express: app
// })


// db 연결
db.connect((err) => {
    if (err) {
        console.error('DB 연결 실패: ', err);
        return;
    }
    console.log('DB 연결 성공');
});

// middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(Express.json());
app.use(Express.static('../front/public'));
app.use(cors({
    origin: 'http://localhost:8080',
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");

// app.use("/auth/login", (req, res) => {res.send("Hello World")});
// app.use("/auth/register", (req, res) => {res.send("Hello world")});
// app.use("/auth/logout", (req, res) => {res.send("Hello world")});
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/likes", likeRoutes);

// 404 처리 미들웨어
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

const PORT = app.get('port');
app.listen(PORT, () => {
    console.log(PORT, '번 포트 Server running');
})
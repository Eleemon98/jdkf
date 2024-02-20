exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('로그인 필요');
    }
}; // 로그인되어있는 상태에서 해야하는 작업에서 쓰일 코드

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()){
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태');
        res.redirect(`/?error=${message}`);
    }
}; // 로그인이 안 되어있는 상태에서만 해야하는 작업에서 쓰일 코드
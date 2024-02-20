const passport = require('passport');
const local = require('./passportConfig');
const User =require('../connect');

module.exports = () => {
    // done은 사용자 인증이 완료되면 알려주는 함수
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findOne({ where : {id}})
        .then(user => done(null, user))
        .catch(err => done(err));
    });
    local();    
}
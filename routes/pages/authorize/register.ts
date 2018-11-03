import express = require('express')
import {_Session, _RequestSession, _User} from '../../interfaces'


const {authError, User} = require('../../../models/user');
const HttpError = require('../../../error/index').HttpError;

const {checkValid} = require('../../../middleware/checkAuth');

function get(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.render("pages/authorize/register", {
        title: 'Register'
    });
}

function post(req: _RequestSession, res: express.Response, next: express.NextFunction) {
    const email = req.body.email;
    const password = req.body.password;
    const nick = req.body.nick;
    const passwordRep = req.body.password_repeat;

    let message = checkValid({nick: nick, password: password, password_repeat: passwordRep, email: email});
    if (message) return next(new HttpError(400, message));

    User.register(nick, email, password, function (err: Error, user: _User) {
        if (err) {
            if (err instanceof authError) {
                return next(new HttpError(403, err.message))
            } else {
                return next(err);
            }
        }
        req.session.user = {_id:user._id, email: user.email};
        res.redirect('/');
    });
}

module.exports = {get, post};

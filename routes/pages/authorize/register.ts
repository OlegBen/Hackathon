import express = require('express')
import { _RequestSession, _User} from '../../interfaces'
import User from "../../../models/user";
import {authError} from "../../../models/base";
import {HttpError} from "../../../error/index";




const {checkValid} = require('../../../middleware/checkAuth');

function get(_: express.Request, res: express.Response, __: express.NextFunction) {
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

    User.register(nick, email, password,  (err: Error | Event | null, user?: _User) => {
        if (err) {
            if (err instanceof authError) {
                return next(new HttpError(403, err.message))
            } else {
                return next(err);
            }
        }
        if(user)
        req.session.user = {id:user.id, email: user.email};
        res.redirect('/');
    });
}

module.exports = {get, post};

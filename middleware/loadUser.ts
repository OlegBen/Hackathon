import express = require('express')
import {_User, _RequestUser} from '../routes/interfaces';
import User from "../models/user";


module.exports = function (req: _RequestUser, res: express.Response, next: express.NextFunction) {
    req.user = res.locals.user = null;
    if (!req.session.user) return next();

    User.findById(req.session.user.id, (err: Error | Event | null, user?: _User) => {
        if (err) return next(err);
        if (user)
            req.user = res.locals.user = user;
        next();
    });
};
import express = require('express')
import {_User, _RequestUser} from '../routes/interfaces';


const User = require('../models/user').User;


module.exports = function (req: _RequestUser, res: express.Response, next: express.NextFunction) {
    req.user = res.locals.user = null;
    if (!req.session.user) return next();
    User.findById(req.session.user, function (err: Error, user: _User) {
        if (err) return next(err);
        req.user = res.locals.user = user;
        next();
    })
};
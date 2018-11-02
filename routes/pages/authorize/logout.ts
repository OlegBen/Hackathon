import express = require('express')
import {_RequestSession} from "../../interfaces";

function post(req: _RequestSession, res: express.Response, next: express.NextFunction) {
    const sid = req.session.id;

    const io = req.app.get('io');
    req.session.destroy(function (err: Error) {
        //    io.sockets.$emit('sessionReload', sid);
        //    io.sockets._events.sessionReload(sid);
        if (err) return next(err);

        res.redirect('/');
    });
}

module.exports = {post};

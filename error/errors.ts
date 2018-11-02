import express = require('express')
import {_ErrorStatus} from "../routes/interfaces";




function notFoundPage(req: express.Request, res: express.Response, next: express.NextFunction) {
    const err = new _ErrorStatus('Not Found');
    err.status = 404;
    next(err);
}

function serverError(err: _ErrorStatus, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.status + " " + err.message,
    });
}

module.exports = {notFoundPage, serverError};
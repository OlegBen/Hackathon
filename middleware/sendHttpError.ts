import express = require('express')
import {_ResponseSendHttpError, _ErrorStatus} from "../routes/interfaces";

module.exports = function (req:express.Request, res:_ResponseSendHttpError, next:express.NextFunction) {
    res.sendHttpError = function (error:_ErrorStatus) {
        res.status(error.status);
        if (res.req && res.req.headers['x-requested-with'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            res.render("error", {
                error: error,
                title: 'Error'
            })
        }
    };
    next();
};
import express = require('express')
import {_EmptyObj} from "../routes/interfaces";


const visits:_EmptyObj = {};

function Counter(req:express.Request, res:express.Response, next:express.NextFunction) {
    let key = req.path;
    if (visits[key]) visits[key]++;
    else visits[key] = 1;
    next()
}

module.exports = {Counter, visits};

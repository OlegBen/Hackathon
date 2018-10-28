import express = require('express')
import {_AuthorizeData, _RequestUser} from "../routes/interfaces";

const HttpError = require('../error/index').HttpError;

function checkAuth(req:_RequestUser, res:express.Response, next:express.NextFunction) {
    if (!req.user) {
        return next(new HttpError(401, "Вы не авторизованы"));
    }
    next();
}

function checkValid(obj:_AuthorizeData) {
    let message:string | undefined;
    for (let key in obj) {
        if (key === "email")
            message = checkEmailValid(obj[key]);
        else
            message = checkOtherValid(obj[key], key);
        if (message)
            return message;
    }
    if (obj.password && obj.password_repeat)
        if (obj.password !== obj.password_repeat)
            return "Password Not Equals"
}

function checkEmailValid(text:string) {
    if (!text.match(/[a-z0-9_]+@[a-z]{2,8}.[a-z]{2,8}$/i)) return "Email is Not Valid";
    else if (text.split('@')[0].length < 5) return "Email is short, need len > 4";
    else if (text.split('@')[0].length > 12) return "Email is big, need len < 12";
}

function checkOtherValid(text:string | undefined, key:string) {
    if(!text) return
    if (!text.match(/[a-z0-9_]+$/i)) return `${key} is Not Valid`;
    else if (text.length < 5) return `${key} is short, need len > 4`;
    else if (text.length > 12) return `${key} is big, need len < 12`;
}

module.exports = {checkValid, checkAuth};
import express = require('express')
import {_RequestUser} from "../interfaces";
import {_Resume, Resume} from "../../models/resume";

function get(_: _RequestUser, res: express.Response, __: express.NextFunction) {
    Resume.getAllForPublic((arr: _Resume[]) => {
        res.send(JSON.stringify(arr));
    });
}

module.exports = {get};

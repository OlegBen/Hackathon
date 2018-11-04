import express = require('express')
import {_RequestSettUser} from "../interfaces";
import {_Resume, Resume} from "../../models/resume";

function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    Resume.getPageForPublic(req.query.page,req.server_settings.resume.count, (arr: _Resume[]) => {
        res.send(JSON.stringify(arr));
    });
}

module.exports = {get};

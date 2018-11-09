import express = require('express')
import {_RequestSettUser} from "../interfaces";

import Resume, {_Resume} from "../../models/resume";




function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    Resume.getAllPublicQuery(req.query, req.server_settings.vacancy.count, ( arr: _Resume[], countPages: number) => {
        res.send(JSON.stringify({arr: arr, countPages: countPages}));
    });
}

module.exports = {get};

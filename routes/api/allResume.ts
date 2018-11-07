import express = require('express')
import {_RequestSettUser} from "../interfaces";
import {_Resume} from "../../models/interfaces";


const Resume = require('../../models/resume');


function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    Resume.getAllPublicQuery(req.query, req.server_settings.vacancy.count, ( arr: _Resume[], countPages: number) => {
        res.send(JSON.stringify({arr: arr, countPages: countPages}));
    });
}

module.exports = {get};

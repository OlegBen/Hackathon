import express = require('express')
import {_RequestSettUser} from "../interfaces";
import {_Vacancy} from "../../models/interfaces";


const Vacancy = require('../../models/vacancy');

function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    Vacancy.getAllPublicQuery(req.query, req.server_settings.vacancy.count, ( arr: _Vacancy[], countPages: number) => {
        res.send(JSON.stringify({arr: arr, countPages: countPages}));
    });
}

module.exports = {get};

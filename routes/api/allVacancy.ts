import express = require('express')
import {_RequestSettUser} from "../interfaces";
import Vacancy, {_Vacancy} from "../../models/vacancy";


function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    if (req.query.companiom_token) {

    } else
        Vacancy.getAllPublicQuery(req.query, req.server_settings.vacancy.count, (arr: _Vacancy[], countPages: number) => {
            res.send(JSON.stringify({arr: arr, countPages: countPages}));
        });
}

module.exports = {get};

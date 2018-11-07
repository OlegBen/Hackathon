import express = require('express')
import {_RequestSettUser, } from "../interfaces";
import {_Vacancy} from "../../models/interfaces";


const Vacancy = require('../../models/vacancy');

function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    const query = req.query;
    if (req.user && query.admin && query.admin == "true")
        Vacancy.getAllPublicQuery({creator_id: req.user.id}, req.server_settings.vacancy.count, (arr: _Vacancy[], countPages: number) => {
            res.send(JSON.stringify(arr));
        });
    else
        res.send(JSON.stringify("Fuck You"));
}

module.exports = {get};


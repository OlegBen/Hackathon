import express = require('express')
import {_RequestSettUser} from "../interfaces";
import {_Vacancy, Vacancy} from "../../models/vacancy";

function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    Vacancy.getPageForPublic(req.query.page, req.server_settings.vacancy.count, (arrVacancys: _Vacancy[]) => {
        res.send(JSON.stringify(arrVacancys));
    });
}

module.exports = {get};

import express = require('express')
import {_RequestUser} from "../interfaces";
import {_Vacancy, Vacancy} from "../../models/vacancy";

function get(_: _RequestUser, res: express.Response, __: express.NextFunction) {
    Vacancy.getAllForPublic((arrVacancys: _Vacancy[]) => {
        res.send(JSON.stringify(arrVacancys));
    });
}

module.exports = {get};

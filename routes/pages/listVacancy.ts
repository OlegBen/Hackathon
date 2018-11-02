import express = require('express')
import {_Vacancy, Vacancy} from "../../models/vacancy";

function get(_:express.Request, res:express.Response, __:express.NextFunction) {
    Vacancy.getAllForPublic((arrVacancys: _Vacancy[]) => {
        res.render("pages/listVacancy", {
            arrVacancys
        });
    })
}

module.exports = {get};

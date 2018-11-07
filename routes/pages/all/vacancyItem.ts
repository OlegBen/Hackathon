import express = require('express')
import {_RequestUser} from "../../interfaces";
import {_Vacancy} from "../../../models/interfaces";

const HttpError = require('../../../error/index').HttpError;
const Vacancy = require('../../../models/vacancy');


function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    Vacancy.findById(req.params.id, (vacancy: _Vacancy) => {
        if (!vacancy) return next(new HttpError(404, "Вакансия не найдена"));

        if ((req.query.admin && req.query.admin === 'true' && req.user && req.user.id == vacancy.creator_id) ||
            (vacancy.token && req.query.token == vacancy.token))
            res.render("pages/user/createVacancy", {
                vacancy,
                buttonText: 'Update',
                actionForm: 'update'
            });
        else
            res.render("pages/all/vacancyItem", {
                vacancy
            });
    });
}


module.exports = {get};


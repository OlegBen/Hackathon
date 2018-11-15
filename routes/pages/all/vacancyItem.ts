import express = require('express')
import {_RequestUser} from "../../interfaces";
import Vacancy, {_Vacancy} from "../../../models/vacancy";
import {History} from "../../../models/history";

const HttpError = require('../../../error/index').HttpError;


function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    Vacancy.findById(req.params.id, (vacancy: _Vacancy | null) => {
        if (!vacancy) return next(new HttpError(404, "Вакансия не найдена"));
        if(req.user && vacancy.id)
            History.add(false, req.user!.id, vacancy.id, null);
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


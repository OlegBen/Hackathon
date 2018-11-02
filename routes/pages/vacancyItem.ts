import express = require('express')
import {_Vacancy, Vacancy} from "../../models/vacancy";
import {_RequestUser} from "../interfaces";

const HttpError = require('../../error/index').HttpError;
const getDataFromReq = require('./user/createVacancy').getDataFromReq;

function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    Vacancy.getOne({_id: req.params.id}, (vacancy: _Vacancy) => {
        if (!vacancy) return next(new HttpError(404, "Вакансия не найдена"));
        if (req.query.admin && req.query.admin === 'true' && req.user && req.user._id == vacancy.creatorId)
            res.render("pages/user/createVacancy", {
                vacancy,
                buttonText: 'Update'
            });
        else
            res.render("pages/vacancyItem", {
                vacancy
            });
    });
}

function post(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    const data = getDataFromReq(req);
    data._id = req.body.cv_id;
    Vacancy.UpdateOne(data, (vacancy: _Vacancy) => {});
    res.redirect('/user_page');
}


module.exports = {get, post};


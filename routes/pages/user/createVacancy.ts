import express = require('express')
import {_Vacancy} from "../../../models/vacancy";
import {_RequestUser} from "../../interfaces";

const HttpError = require('../../../error/index').HttpError;
const {vacancyError, Vacancy} = require('../../../models/vacancy');

function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    const data = {
        company: "Intel",
        type: "Полная",
        logo: "***",
        url: "google.com",
        position: "Разработчик",
        location: "Симферополь",
        category: ["Программист"],
        description: "Описание",
        interview: "Собеседование",
        isPublic: true,
        email: "example@gmail.com",
        creatorId: req.user!._id,
        state: "Актуально"
    };
    Vacancy.create(data, (vacancy: _Vacancy) => {
    });

    /*
    Vacancy.delete('5bdc2d00bb20c61c14d3036a', function (err: Error, isDelete: Boolean) {
        if (err) {
            if (err instanceof vacancyError)
                return next(new HttpError(403, err.message));
            else
                return next(err);
        }
    });

*/
    res.render("pages/user/createVacancy", {});
}

function post(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    const data = {
        company: req.body.cv_company,
        type: req.body.cv_type,
        logo: req.body.cv_logo,
        url: req.body.cv_url,
        position: req.body.cv_position,
        location: req.body.cv_location,
        category: req.body.cv_category,
        description: req.body.cv_description,
        interview: req.body.cv_interview,
        isPublic: req.body.cv_is_public === 'on' ? true : false,
        email: req.body.cv_email,
        creatorId: req.user!._id,
        state: "Actual"
    };
    console.log(data);
    //Vacancy.create(data, (vacancy: _Vacancy) => {});
    res.redirect('/create_vacancy');
}

module.exports = {get, post};

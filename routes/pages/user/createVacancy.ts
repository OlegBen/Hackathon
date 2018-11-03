import express = require('express')
import {_Vacancy} from "../../../models/vacancy";
import {_RequestUser} from "../../interfaces";

const {Vacancy} = require('../../../models/vacancy');

function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    res.render("pages/user/createVacancy", {
        vacancy: {
            state: "Actual",
            email: req.user!.email
        },
        buttonText: 'Create',
        actionForm: 'create'
    });
}

function post(req: _RequestUser, res: express.Response, _: express.NextFunction) {
    let data: any;
    if (req.query.action != 'delete')
        data = getDataFromReq(req);
    switch (req.query.action) {
        case 'delete':
            Vacancy.delete(req.query._id, (_: Error, __: Boolean) => {
            });
            break;
        case 'update':
            // @ts-ignore
            data._id = req.body.cv_id;
            Vacancy.UpdateOne(data, (_: _Vacancy) => {
            });
            break;
        case 'create':
            Vacancy.create(data, (_: _Vacancy) => {
            });
            break;
    }

    res.redirect('/list_vacancy');
}

function getDataFromReq(req: _RequestUser) {
    return {
        company: req.body.cv_company,
        type: req.body.cv_type,
        logo: req.body.cv_logo,
        url: req.body.cv_url,
        position: req.body.cv_position,
        location: req.body.cv_location,
        category: req.body.cv_category,
        description: req.body.cv_description,
        isPublic: req.body.cv_is_public === 'on' ? true : false,
        email: req.body.cv_email,
        phone: req.body.cv_phone,
        creatorId: req.user!._id,
        state: req.body.cv_state
    };
}


module.exports = {get, post, getDataFromReq};

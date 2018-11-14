import express = require('express')
import {_RequestUser} from "../../interfaces";
import Vacancy from "../../../models/vacancy";

const randToken = require('rand-token');


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
    if(req.user) {
        if (req.query.action != 'delete')
            data = getDataFromReq(req);
        switch (req.query.action) {
            case 'delete':
                Vacancy.deleteOne(req.query.id, req.user.id);
                break;
            case 'update':
                Vacancy.updateOne(req.body.cv_id, data);
                break;
            case 'create':
                Vacancy.create(data);
                break;
        }
    }
    res.redirect('/user_page');
}

function getDataFromReq(req: _RequestUser) {
    return {
        company: req.body.cv_company,
        type: req.body.cv_type,
        logo: req.body.cv_logo,
        url: req.body.cv_url,
        position: req.body.cv_position,
        location_id: req.body.cv_location_id ? parseInt(req.body.cv_location_id) : null,
        category_id: req.body.cv_category_id ? parseInt(req.body.cv_category_id) : null,
        description: req.body.cv_description,
        is_public: req.body.cv_is_public === 'on' ? 1 : 0,
        creator_id: req.user!.id,
        token: req.body.cv_generate_token == 'on' ? randToken.generate(16) : ''
    };
}


module.exports = {get, post, getDataFromReq};

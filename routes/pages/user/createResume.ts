import express = require('express')
import {_RequestUser} from "../../interfaces";
import Resume from "../../../models/resume";




function get(req: _RequestUser, res: express.Response, __: express.NextFunction) {
    res.render("pages/user/createResume", {
        resume:{
            email:req.user!.email
        },
        buttonText:'Create',
        actionForm: 'create'
    });
}

function post(req: _RequestUser, res: express.Response, _: express.NextFunction) {
    if(req.user) {
        let data: any;
        if (req.query.action != 'delete')
            data = getDataFromReq(req);
        switch (req.query.action) {
            case 'delete':
                Resume.deleteOne(req.query.id, req.user.id);
                break;
            case 'update':
                Resume.updateOne(req.body.rm_id, data);
                break;
            case 'create':
                Resume.create(data);
                break;
        }
    }
    res.redirect('/user_page');
}

function getDataFromReq(req:_RequestUser){
    const country_id = req.body.rm_location_id ? parseInt(req.body.rm_location_id) : null;
    const city_id = req.body.rm_location_id && country_id ? parseInt(req.body.rm_location_id) : null;
    const location_id = req.body.rm_location_id && city_id ? parseInt(req.body.rm_location_id) : null;

    const category_id = req.body.rm_category_id ? parseInt(req.body.rm_category_id) : null;
    const sub_category_id = req.body.rm_sub_category_id && category_id ? parseInt(req.body.rm_sub_category_id) : null;
    return {
        name: req.body.rm_name,
        surname:req.body.rm_surname,
        age: parseInt(req.body.rm_age),
        type: req.body.rm_type,
        position: req.body.rm_position,
        country_id: country_id,
        city_id: city_id,
        location_id: location_id,
        category_id: category_id,
        sub_category_id: sub_category_id,
        description: req.body.rm_description,
        is_public: req.body.rm_is_public === 'on' ? 1 : 0,
        creator_id: req.user!.id
    }
}


module.exports = {get, post, getDataFromReq};

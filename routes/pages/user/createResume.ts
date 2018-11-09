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
                //Resume.delete(req.query.id, req.user.id);
                break;
            case 'update':
                data._id = req.body.rm_id;
                //Resume.UpdateOne(data);
                break;
            case 'create':
                Resume.create(data);
                break;
        }
    }
    res.redirect('/user_page');
}

function getDataFromReq(req:_RequestUser){
    return {
        name: req.body.rm_name,
        surname:'surname',
        age: parseInt(req.body.rm_age),
        type: req.body.rm_type,
        position: req.body.rm_position,
        location_id: null,
        sub_category_id: null,
        description: req.body.rm_description,
        is_public: req.body.rm_is_public === 'on' ? 1 : 0,
        email: req.body.rm_email,
        creator_id: req.user!.id
    }
}


module.exports = {get, post, getDataFromReq};

import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";
import {ServerSettings} from "../../models/serverSettings";


function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    res.render("pages/adminPanel", {
        server_settings: req.server_settings ? req.server_settings : {vacancy: {}, resume: {}}
    });
}

function post(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    const settings = {
        myId: 0,
        vacancy: {
            count: parseInt(req.body.ss_vacancy_count),
            days: parseInt(req.body.ss_vacancy_days),
        },
        resume: {
            count: parseInt(req.body.ss_resume_count),
            days: parseInt(req.body.ss_resume_days),
        }
    };
    ServerSettings.updateOne(settings, (err:Error)=>{
        res.redirect('/admin_panel')
    });
}

module.exports = {get, post};


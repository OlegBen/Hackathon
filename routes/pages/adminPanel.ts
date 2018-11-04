import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";
import {ServerSettings} from "../../models/serverSettings";


function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    res.render("pages/adminPanel", {
        server_settings: req.server_settings ? req.server_settings : {vacancy: {}, resume: {}}
    });
}

function post(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    const countV = parseInt(req.body.ss_vacancy_count);
    const countR = parseInt(req.body.ss_resume_count);
    const daysV = parseInt(req.body.ss_vacancy_days);
    const daysR = parseInt(req.body.ss_resume_days);
    const settings = {
        myId: 0,
        vacancy: {
            count: countV >= 3 && countV <= 40 ? countV : 10 ,
            days:  daysV >= 7 && daysV <= 30 ? daysV : 15,
        },
        resume: {
            count:  countR >= 3 && countR <= 40 ? countR : 10,
            days:  daysR >= 7 && daysR <= 30 ? daysR : 15,
        }
    };
    ServerSettings.updateOne(settings, (err:Error)=>{
        res.redirect('/admin_panel')
    });
}

module.exports = {get, post};


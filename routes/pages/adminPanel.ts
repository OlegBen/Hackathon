import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";
import {ServerSettings} from "../../models/mongodb/serverSettings";
import Location from "../../models/location";
import Category from "../../models/category";


function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    res.render("pages/adminPanel", {
        server_settings: req.server_settings ? req.server_settings : {vacancy: {}, resume: {}}
    });
}

function post(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    switch (req.query.action) {
        case 'settings':
            const countV = parseInt(req.body.ss_vacancy_count);
            const countR = parseInt(req.body.ss_resume_count);
            const daysV = parseInt(req.body.ss_vacancy_days);
            const daysR = parseInt(req.body.ss_resume_days);
            const settings = {
                myId: 0,
                vacancy: {
                    count: countV >= 1 && countV <= 40 ? countV : 10,
                    days: daysV >= 7 && daysV <= 30 ? daysV : 15,
                },
                resume: {
                    count: countR >= 3 && countR <= 40 ? countR : 10,
                    days: daysR >= 7 && daysR <= 30 ? daysR : 15,
                }
            };
            ServerSettings.updateOne(settings, (err: Error) => {});
            break;
        case 'country':
            if (req.body.country_name)
                Location.createCountry(req.body.country_name);
            break;
        case 'city':
            if (req.body.city_name && req.body.country_id)
                Location.createCity(req.body.city_name, req.body.country_id);
            break;
        case 'location':
            if (req.body.location_name && req.body.city_id)
                Location.createLocation(req.body.location_name, req.body.city_id);
            break;
        case 'category':
            if (req.body.category_name)
                Category.create(req.body.category_name);
            break;
        case 'sub_category':
            if (req.body.sub_category_name && req.body.category_id)
                Category.createSub(req.body.sub_category_name, req.body.category_id);
            break;
    }
    res.redirect('/admin_panel');
}

module.exports = {get, post};


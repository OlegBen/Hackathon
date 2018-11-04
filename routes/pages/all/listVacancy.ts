import express = require('express')
import {Vacancy} from "../../../models/vacancy";
import {_RequetsSett} from "../../../middleware/projectSettings";


function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    Vacancy.getCountPublic((count: number) => {
        res.render("pages/all/listVacancy", {
            countVacancyPages: Math.ceil(count / req.server_settings.vacancy.count)
        });
    });
}


module.exports = {get};

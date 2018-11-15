import express = require('express')
import {_RequestSettUser,} from "../interfaces";
import Vacancy, {_Vacancy} from "../../models/vacancy";


function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    const query = req.query;
    if (req.user && query.admin && query.admin == "true")
        Vacancy.getAllPublicQuery({creator_id: req.user.id}, req.server_settings.vacancy.count, (arr: _Vacancy[], countPages: number) => {
            res.send(JSON.stringify(arr));
        });
    else if (req.query.companiom_token && req.query.id_companion) {
        Vacancy.checkCompanionToken(req.query.id_companion, req.query.companiom_token, (result: any) => {
            if (result.id)
                Vacancy.getAllPublicQuery({
                    creator_id: result.id,
                    companion: {is_public: 1}
                }, req.server_settings.vacancy.count, (arr: _Vacancy[], countPages: number) => {
                    res.send(JSON.stringify(arr));
                });
            else
                res.send(JSON.stringify("Fuck You"));

        })
    }
    else
        res.send(JSON.stringify("Fuck You"));
}

module.exports = {get};


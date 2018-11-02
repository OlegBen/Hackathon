import express = require('express')
import {_RequestUser} from "../interfaces";
import {_Vacancy, Vacancy} from "../../models/vacancy";

function get(req: _RequestUser, res: express.Response, __: express.NextFunction) {
    const query = req.query;
    if (req.user && query.admin && query.admin == "true")
        Vacancy.getAll(req.user._id, (result: _Vacancy[]) => {
            res.send(JSON.stringify(result));
        });
    else{
        res.send(JSON.stringify("Fuck You"));
    }

}

module.exports = {get};

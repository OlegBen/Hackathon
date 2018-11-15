import express = require('express')
import {_RequestSettUser} from "../interfaces";
import Location from "../../models/location";


function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    const country_id = req.query.country_id;
    if (country_id)
        Location.showAllCitysFromCountry(req.query.country_id, (arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        });
    else
        Location.showAllCountrys((arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        })
}

module.exports = {get};

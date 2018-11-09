import express = require('express')
import {_RequestSettUser} from "../interfaces";
import Location from "../../models/location";


function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    if (req.query.country == 'true')
        Location.showAllCountrys((arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        });
    else if (req.query.country_id)
        Location.showAllCitysFromCountry(req.query.country_id, (arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        });
    else if (req.query.city_id)
        Location.showAllLocationsFromCity(req.query.city_id, (arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        });
    else
        res.send(JSON.stringify({status:404}));
}

module.exports = {get};

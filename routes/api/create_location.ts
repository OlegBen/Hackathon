import express = require('express')
import {_RequestSettUser} from "../interfaces";
import Location from "../../models/location";




function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    if(req.query.county_name)
        Location.createCountry( req.query.county_name);
    else if(req.query.city_name && req.query.county_id)
        Location.createCity( req.query.county_name, req.query.county_id);
    else if(req.query.location_name && req.query.city_id)
        Location.createLocation( req.query.county_name, req.query.city_id);
    res.redirect('/admin_panel')
}

module.exports = {get};

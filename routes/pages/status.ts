import express = require('express')

import {RequestInfoProject} from '../../middleware/infoProject'
let {visits} = require('../../middleware/visits');

function get(req:RequestInfoProject, res:express.Response, _:express.NextFunction) {
    res.render("pages/status", {
        time_start: "Запущен: " + (req.info_project || res.locals.info_project),
        visits
    });
}

module.exports = {get};

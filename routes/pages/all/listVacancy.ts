import express = require('express')
import {_RequetsSett} from "../../../middleware/projectSettings";


function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    res.render("pages/all/listVacancy", {

    });
}


module.exports = {get};

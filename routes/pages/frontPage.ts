import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";

const {DB} = require('../../models/base');


function get(req: _RequetsSett, res: express.Response, next: express.NextFunction) {
    res.render("pages/frontPage", {});
}

module.exports = {get};


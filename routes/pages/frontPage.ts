import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";



function get(req: _RequetsSett, res: express.Response, next: express.NextFunction) {
    console.log(req)
    res.render("pages/frontPage", {});
}

module.exports = {get};


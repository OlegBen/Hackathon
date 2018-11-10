import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";
import {DB} from "../../models/base";




function get(req: _RequetsSett, res: express.Response, next: express.NextFunction) {
    //DB.createAllTables(()=>{});
    res.render("pages/frontPage", {});
}

module.exports = {get};


import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";


const {dropTable, createALL, createTable, showAllTables} = require('../../models/postgreSql/base');

function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    createALL(()=>{
        showAllTables();
    });

    //dropTable('resume')
    res.render("pages/frontPage", {});
}

module.exports = {get};


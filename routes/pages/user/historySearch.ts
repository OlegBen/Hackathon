import express = require('express')
import {History} from "../../../models/history";
import {_RequestUser} from "../../interfaces";


function get(req: _RequestUser, res: express.Response, __: express.NextFunction) {
    if (req.user)
        History.getHistory(req.user!.id, true, (result: any) => {
            console.log(result.rows)
        });
    if (req.user)
        History.getFavorites(req.user!.id, true, (result: any) => {
            console.log(result.rows)
        });
    res.render("pages/user/historySearch", {});
}

module.exports = {get};


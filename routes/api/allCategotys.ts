import express = require('express')
import {_RequestSettUser} from "../interfaces";
import Category from "../../models/category";



function get(req: _RequestSettUser, res: express.Response, __: express.NextFunction) {
    if (req.query.category == 'true')
        Category.showAll((arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        });
    else if (req.query.category_id)
        Category.showAllSub(req.query.category_id, (arr: any) => {
            res.send(JSON.stringify({arr: arr}));
        });
    else
        res.send(JSON.stringify({status:404}));
}

module.exports = {get};

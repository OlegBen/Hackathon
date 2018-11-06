import express = require('express')
import {_RequetsSett} from "../../middleware/projectSettings";


const HttpError = require('../../error/index').HttpError;
const authError = require('../../models/postgreSql/base').authError;
const {DB,User} = require('../../models/postgreSql/base');

function get(req: _RequetsSett, res: express.Response, next: express.NextFunction) {
    User.register('Muzikanto', 'example1@gmail.com', 'pass', (err:Error, result:any)=>{
        if (err) {
            if (err instanceof authError) {
                return next(new HttpError(403, err.message))
            } else {
                return next(err);
            }
        }
        console.log(result);
        res.render("pages/frontPage", {});
    });

}

module.exports = {get};


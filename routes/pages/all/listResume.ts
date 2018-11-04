import express = require('express')
import {Resume} from "../../../models/resume";
import {_RequetsSett} from "../../../middleware/projectSettings";


function get(req: _RequetsSett, res: express.Response, __: express.NextFunction) {
    Resume.getCountPublic((count:number)=>{
        res.render("pages/all/listResume", {
            countResumePages: Math.ceil(count / req.server_settings.resume.count)
        });
    });
}

module.exports = {get};


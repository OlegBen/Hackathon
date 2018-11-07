import express = require('express')
import {_RequestUser} from "../../interfaces";
import {_Resume} from "../../../models/interfaces";

const HttpError = require('../../../error/index').HttpError;
const Resume = require('../../../models/resume');


function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    Resume.findById(req.params.id, (resume: _Resume) => {
        if (!resume) return next(new HttpError(404, "Резюме не найдено"));
        if (req.query.admin && req.query.admin === 'true' && req.user && req.user.id == resume.creator_id)
            res.render("pages/user/createResume", {
                resume,
                buttonText: 'Update',
                actionForm: 'update'
            });
        else
            res.render("pages/all/resumeItem", {
                resume
            });
    });
}



module.exports = {get};


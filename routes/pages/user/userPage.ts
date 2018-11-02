import express = require('express')
import {_RequestUser} from "../../interfaces";

function get(req: _RequestUser, res: express.Response, next: express.NextFunction) {
    res.render("pages/user/userPage", {});
}

module.exports = {get};

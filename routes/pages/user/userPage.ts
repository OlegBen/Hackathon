import express = require('express')
import {_RequestUser} from "../../interfaces";

function get(_: _RequestUser, res: express.Response, __: express.NextFunction) {
    res.render("pages/user/userPage", {});
}

module.exports = {get};

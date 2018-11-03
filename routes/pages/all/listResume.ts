import express = require('express')


function get(_: express.Request, res: express.Response, __: express.NextFunction) {
    res.render("pages/all/listResume", {});
}

module.exports = {get};


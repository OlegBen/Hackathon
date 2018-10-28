import express = require('express')

function get(req:express.Request, res:express.Response, next:express.NextFunction) {
    res.render("pages/frontPage", {});
}

module.exports  ={get};


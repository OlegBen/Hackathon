import express = require('express')

const config = require('../config/config.json');

function check(req: express.Request, res: express.Response, next: express.NextFunction) {
    const host = req.header('host');
    if (host == config.host || host == `localhost:${config.port}` || req.query.companiom_token)
        next();
    else
        res.send(JSON.stringify({status: 400, message: "Not Found Permission"}));
}

module.exports = check;
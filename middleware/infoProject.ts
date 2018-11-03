import express = require('express')
import {_ServerSettings, ServerSettings} from "../models/serverSettings";

export interface _RequetsSett extends express.Request {
    server_sett: _ServerSettings
}

let baseSettings = {myId: 0, vacancy: {days: 30, count: 10}, resume: {days: 30, count: 10}};
ServerSettings.create(baseSettings);


module.exports = function (req: _RequetsSett, res: express.Response, next: express.NextFunction) {
    ServerSettings.getOne((settings: _ServerSettings) => {
        req.server_sett = settings;
    });
    next()
};




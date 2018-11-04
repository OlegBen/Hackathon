import express = require('express')
import {_ServerSettings, ServerSettings} from "../models/serverSettings";

export interface _RequetsSett extends express.Request {
    server_settings: _ServerSettings
}

let baseSettings = {myId: 0, vacancy: {days: 30, count: 10}, resume: {days: 30, count: 10}};


module.exports = (req: _RequetsSett, res: express.Response, next: express.NextFunction) => {
    ServerSettings.getOne((settings: _ServerSettings) => {
        if (settings)
            req.server_settings = settings;
        else {
            req.server_settings = baseSettings;
            ServerSettings.create(baseSettings);
        }
        next();
    });
};




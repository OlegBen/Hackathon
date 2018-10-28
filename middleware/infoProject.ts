import express = require('express')

export interface RequestInfoProject extends express.Request{
    info_project: string
}


function toHHMMSS(value:string) {
    const sec_num = parseInt(value, 10);
    let hours:number | string   = Math.floor(sec_num / 3600);
    let minutes:number | string = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds:number | string = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return `${hours}:${minutes}:${seconds}`
}


const date = toHHMMSS(process.uptime().toString());


module.exports = function (req:RequestInfoProject, res:express.Response, next:express.NextFunction) {
    req.info_project = res.locals.info_project =  `<p>${date}</p>`;
    next()
};




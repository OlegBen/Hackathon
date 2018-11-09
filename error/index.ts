import {_ErrorStatus} from "../routes/interfaces";


const util = require('util');
const http = require('http');

interface _HttpError extends Event{
    status:number
    message:string
}

const HttpError = function  (this: _ErrorStatus, status: number, message: string) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, HttpError);

    this.status = status;
    this.message = message || http.STATUS_CODES[status] || "Error";
} as any as {new (status:number, message:string): _HttpError};

util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';

export {HttpError};


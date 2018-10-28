import {_ErrorStatus} from "../routes/interfaces";
namespace Errors {
    const path = require('path');
    const util = require('util');
    const http = require('http');


    function HttpError(this: _ErrorStatus, status: number, message: string) {
        Error.apply(this, arguments);
        Error.captureStackTrace(this, HttpError);

        this.status = status;
        this.message = message || http.STATUS_CODES[status] || "Error";
    }

    util.inherits(HttpError, Error);
    HttpError.prototype.name = 'HttpError';

    module.exports = {HttpError};

}

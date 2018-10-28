const winston = require('winston');
const ENV = process.env.NODE_ENV;

interface Obj extends Object{
    filename:string
}

function getLogger(module:Obj) {
    const path = module.filename.split('/').slice(-2).join('/');
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: (ENV == 'development') ? 'debug' : 'error',
                label: path
            })
        ]
    });
}

module.exports = getLogger;
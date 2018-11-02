const crypto = require('crypto');
const async = require('async');
const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
const util = require('util');
//const randtoken = require('rand-token');
//randtoken.generate(24)
const schema = new Schema({
    nick: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.methods.encryptPassword = function (password: string) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

interface virtualPass extends Event {
    _plainPassword: string,
    salt: string,
    hashedPassword: string,
    encryptPassword: Function
}

schema.virtual('password')
    .set(function (this: virtualPass, password: string) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function (this: virtualPass) {
        return this._plainPassword;
    });

schema.methods.checkPassword = function (password: string) {
    return this.encryptPassword(password) === this.hashedPassword;
};

schema.statics.register = function (nick: string, email: string, password: string, callback: (e: Event) => void) {
    const User = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            User.findOne({$or: [{email: email}, {nick: nick}]}, callback);
        },
        function (user: any, callback: (e: Event | Error | null, user?: any) => void) {
            if (user) {
                callback(new authError("Пользователь уже существует"))
            }
            else {
                const user = new User({
                    nick: nick,
                    email: email,
                    password: password
                });
                user.save(function (err: Error) {
                    if (err) return callback(err);
                    callback(null, user)
                })

            }
        }
    ], callback);
};

schema.statics.authorize = function (email: string, password: string, callback: (e: Event) => void) {
    const User = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            User.findOne({email: email}, callback);
        },
        function (user: any, callback: (e: Event | null, user?: any) => void) {
            if (user) {
                if (user.checkPassword(password))
                    callback(null, user);
                else
                    callback(new authError("Пароль неверен"))
            }
            else {
                callback(new authError("Пользователь не найден"));
            }
        }
    ], callback);
};

schema.statics.deleteUser = function (email: string, password: string, callback: (e: Event) => void) {
    const User = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            User.findOne({email: email}, callback);
        },
        function (user: any, callback: (e: Event | null, user?: any) => void) {
            if (user) {
                if (user.checkPassword(password))
                {
                    user.remove()
                }
                else
                    callback(new authError("Пароль неверен"))
            }
            else {
                callback(new authError("Пользователь не найден"));
            }
        }
    ], callback);
};

export const User = mongoose.model('User', schema);

interface authError extends Event {
    message: string
}

const authError = function (this: authError, message: string) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, authError);
    this.message = message
} as  any as{ new (message: string): authError; };

util.inherits(authError, Error);
authError.prototype.name = 'authError';


module.exports = {authError, User};

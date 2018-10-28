"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require('crypto');
var async = require('async');
var mongoose = require('../lib/mongoose'), Schema = mongoose.Schema;
var util = require('util');
var schema = new Schema({
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
schema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};
schema.virtual('password')
    .set(function (password) {
    this._plainPassword = password;
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
})
    .get(function () {
    return this._plainPassword;
});
schema.methods.checkPassword = function (password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
schema.statics.register = function (nick, email, password, callback) {
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({ $or: [{ email: email }, { nick: nick }] }, callback);
        },
        function (user, callback) {
            if (user) {
                callback(new authError("Пользователь уже существует"));
            }
            else {
                var user_1 = new User({
                    nick: nick,
                    email: email,
                    password: password
                });
                user_1.save(function (err) {
                    if (err)
                        return callback(err);
                    callback(null, user_1);
                });
            }
        }
    ], callback);
};
schema.statics.authorize = function (email, password, callback) {
    var User = this;
    async.waterfall([
        function (callback) {
            User.findOne({ email: email }, callback);
        },
        function (user, callback) {
            if (user) {
                if (user.checkPassword(password))
                    callback(null, user);
                else
                    callback(new authError("Пароль неверен"));
            }
            else {
                callback(new authError("Пользователь не найден"));
            }
        }
    ], callback);
};
exports.User = mongoose.model('User', schema);
var authError = function (message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, authError);
    this.message = message;
};
util.inherits(authError, Error);
authError.prototype.name = 'authError';
module.exports = { authError: authError, User: exports.User };

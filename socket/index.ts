import {_Session, _Socket, _User, _Handshake} from "../routes/interfaces";
import {Server, Socket} from "socket.io";
import {HttpError} from "../error/index";

const log = require('../lib/log')(module);
const cookie = require('cookie');
const async = require('async');
const config = require('../config/config.json');

const {sessionStore} = require('../lib/sessionsStore');
const {User} = require('../models/user');
const cookieParser = require('cookie-parser');

module.exports = function (server: Server) {
    let io = require('socket.io').listen(server);
    io.set('origins', 'localhost:' + config.port);
    io.set('logger', log);
    io.set('authorization', function (handshake: _Handshake, callback: (e: Event | Error | null, check?: Boolean) => void) {
        async.waterfall([
            function (callback: (e: Event | null) => void) {
                handshake.cookies = cookie.parse(handshake.headers.cookie || '');
                let sidCookie = handshake.cookies[config.session.key];
                let sid = cookieParser.signedCookie(sidCookie, config.session.secret);
                loadSession(sid, callback);
            },
            function (session: _Session, callback: (e: Event | Error | null) => void) {
                if (session === null || !session) callback(new HttpError(401, "No session"));
                else {
                    handshake.session = session;
                    loadUser(session, callback);
                }
            },
            function (user: _User, callback: (e: Event | null) => void) {
                if (!user) callback(new HttpError(403, "Anonymous session may not connect"));
                handshake.user = user;
                callback(null);
            }

        ], function (err: Error) {
            if (!err) return callback(null, true);
            if (err instanceof HttpError) return callback(null, false);
            callback(err);
        });

    });

    io.sockets.on('sessionReload', function (sid: string) {
        let clients = io.sockets.clients();
        clients.forEach(function (client: _Socket) {
            if (client.handshake.session.id !== sid) return;
            loadSession(sid, function (err, session) {
                if (err) {
                    client.emit("error", "server error");
                    client.disconnect();
                    return;
                }
                if (!session) {
                    client.emit("logout");
                    client.disconnect();
                    return;
                }
                client.handshake.session = session;
            });

        });

    });

    io.sockets.on('connection', function (socket: Socket) {
        let username = socket.client.request.user.nick;
        socket.broadcast.emit('join', username);
        socket.on('message', function (text: string, cb: Function) {
            io.sockets.emit('message', username, text);
            cb && cb();
        });
    });
    return io;
};

function loadSession(sid: string, callback: (e: Event | null, session?: _Session | null) => void) {
    sessionStore.load(sid, function (err: Error, session: _Session) {
        if (session === undefined || session.user === undefined) return callback(null, null);
        else return callback(null, session);
    });

}

function loadUser(session: _Session, callback: (e: Event | Error | null, user?: _User | null) => void) {
    if (!session.user) {
        log.debug("Session %s is anonymous", session.id);
        return callback(null, null);
    }
    log.debug("retrieving user ", session.user);
    User.findById(session.user, function (err: Error, user: _User) {
        if (err) return callback(err);
        if (!user) return callback(null, null);
        log.debug("user findbyId result: " + user);
        callback(null, user);
    });
}



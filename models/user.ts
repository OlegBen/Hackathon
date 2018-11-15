import {_User} from "../routes/interfaces";
import {authError, cbQuery, pool} from "./base";

const async = require('async');



class User {
    static register(nick: string, email: string, password: string, callback: (e: Event) => void) {
        async.waterfall([
            function (callback: (e: Event | null) => void) {
                cbQuery({
                    text: 'SELECT *FROM Client WHERE email = $1',
                    values: [email],
                }, callback)
            },
            function (user: any, callback: (e: Event | Error | null, result?: any) => void) {
                if (user.length != 0) {
                    callback(new authError("Пользователь уже существует"));
                } else {
                    cbQuery({
                        text: 'INSERT INTO Client(nick, email, hashed_password, salt) VALUES($1, $2, $3, $4)',
                        values: [nick, email, password, 'salt']
                    }, () => {
                        cbQuery({
                            text: 'SELECT *FROM Client WHERE email = $1',
                            values: [email],
                        }, (err: Event | null, result: _User[]) => {
                            if (result.length > 0)
                                callback(null, result[0]);
                            else
                                callback(new authError('Ошибка!'));
                        });
                    });
                }
            }
        ], callback);
    }

    static authorize(email: string, password: string, callback: (e: Event) => void) {
        async.waterfall([
            function (callback: (e: Event | null) => void) {
                cbQuery({
                    text: 'SELECT *FROM Client WHERE email = $1',
                    values: [email],
                }, callback)
            },
            function (user: any, callback: (e: Event | Error | null, result?: any) => void) {
                if (user && user.length > 0) {
                    if (user[0].hashed_password == password)
                        callback(null, user[0]);
                    else
                        callback(new authError("Пароль неверен"))
                }
                else
                    callback(new authError("Пользователь не найден"));
            }
        ], callback);
    }

    static findById(id: number, callback: (err: Error | Event | null, user?: _User) => void) {
        pool.query({
            text: 'SELECT *FROM Client WHERE id = $1',
            values: [id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if(result) {
                if (result.rows.length > 0)
                    callback(null, result.rows[0]);
                else
                    callback(null)
            } else
                callback(null)
        });
    }
}

export default User;
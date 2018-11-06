namespace DataBasePG {
    const async = require('async');
    const util = require('util');
    const {Pool} = require('pg');
    const config = require('../../config/config.json');


    const connectionString = config.postgresSql;
    const pool = new Pool({
        connectionString: connectionString,
        ssl: true
    });


    class DB {
        static showAllTables() {
            return new Promise((resolve: any, reject: any) => {
                pool.query(`SELECT table_name  FROM information_schema.tables WHERE table_schema='public'`, (err: Error, result: any) => {
                    if (err) console.log(err);
                    resolve(result.rows)
                });
            })
        }

        static createAllTables(callback: (e: Event) => void) {
            async.waterfall([
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS Country(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    name varchar(100)\n' +
                        ');', callback)
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS City(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    name varchar(100),\n' +
                        '    id_country bigint,\n' +
                        '    FOREIGN KEY(id_country) REFERENCES Country(id) ON DELETE CASCADE\n' +
                        ');');
                    callback()
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS Location(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    name varchar(100),\n' +
                        '    id_city bigint,\n' +
                        '    FOREIGN KEY(id_city) REFERENCES City(id) ON DELETE CASCADE\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS Client (\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    nick varchar(20) NOT NULL,\n' +
                        '    email varchar(40) NOT NULL,\n' +
                        '    hashedPassword varchar(50) NOT NULL,\n' +
                        '    salt varchar(100) NOT NULL,\n' +
                        '\n' +
                        '    locationId bigint,\n' +
                        '    FOREIGN KEY(locationId) REFERENCES Location(id),\n' +
                        '\n' +
                        '    role varchar(10),\n' +
                        '\n' +
                        '    created timestamp DEFAULT CURRENT_TIMESTAMP\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS Category(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    name varchar(50)  NOT NULL\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS SubCategory(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    name varchar(50)  NOT NULL,\n' +
                        '    id_category bigint  NOT NULL,\n' +
                        '    FOREIGN KEY(id_category) REFERENCES Category(id) ON DELETE CASCADE\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS Vacancy(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    company varchar(50),\n' +
                        '    type varchar(30),\n' +
                        '    logo varchar(1000),\n' +
                        '    url varchar(1000),\n' +
                        '    position varchar(100),\n' +
                        '    description text,\n' +
                        '    isPublic BIT,\n' +
                        '\n' +
                        '    phone varchar(100),\n' +
                        '    token varchar(50),\n' +
                        '\n' +
                        '    created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n' +
                        '\n' +
                        '    creatorId bigint  NOT NULL,\n' +
                        '    FOREIGN KEY(creatorId) REFERENCES Client(id) ON DELETE CASCADE,\n' +
                        '\n' +
                        '    subCategoryId bigint,\n' +
                        '    FOREIGN KEY(subCategoryId) REFERENCES SubCategory(id),\n' +
                        '\n' +
                        '    locationId bigint,\n' +
                        '    FOREIGN KEY(locationId) REFERENCES Location(id)\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS Resume(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    name varchar(50),\n' +
                        '    surname varchar(50),\n' +
                        '    age smallint,\n' +
                        '    type varchar(50),\n' +
                        '    position varchar(100),\n' +
                        '    description text,\n' +
                        '    isPublic BIT,\n' +
                        '\n' +
                        '    locationId bigint,\n' +
                        '    FOREIGN KEY(locationId) REFERENCES Location(id),\n' +
                        '\n' +
                        '    subCategoryId bigint,\n' +
                        '    FOREIGN KEY(subCategoryId) REFERENCES SubCategory(id),\n' +
                        '\n' +
                        '    FOREIGN KEY(id) REFERENCES Client(id) ON DELETE CASCADE\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS HistoryVacancy(\n' +
                        '    id SERIAL PRIMARY KEY,\n' +
                        '    isFavorite BIT  NOT NULL,\n' +
                        '    id_user bigint  NOT NULL,\n' +
                        '    FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n' +
                        '    id_vacancy bigint  NOT NULL,\n' +
                        '    FOREIGN KEY(id_vacancy) REFERENCES Vacancy(id)\n' +
                        ');', callback);
                },
                function (callback: () => void) {
                    cbQueryEmpty('CREATE TABLE IF NOT EXISTS HistoryResume(\n' +
                        '    id SERIAL,\n' +
                        '    isFavorite BIT  NOT NULL,\n' +
                        '    id_user bigint  NOT NULL,\n' +
                        '    FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n' +
                        '    id_resume bigint  NOT NULL,\n' +
                        '    FOREIGN KEY(id_resume) REFERENCES Resume(id)\n' +
                        ');', callback);
                }
            ], callback);
            console.log("All tables created!");
        }

    }


    function cbQueryEmpty(query: string, callback?: () => void) {
        pool.query(query, (err: Error, _: any) => {
            if (err) console.log(err);
            if (callback) callback();
        });
    }



    function cbQuery(query: string | { text: string, values: any[] }, callback: (e:Event | null, result:any) => void) {
        pool.query(query, (err: Error, result: any) => {
            if (err) console.log(err);
            callback(null, result.rows);
        });
    }



    class User {
        static register(nick: string, email: string, password: string, callback: (e: Event) => void) {
            async.waterfall([
                function (callback: (e: Event | null) => void) {
                    const query = {
                        text: 'SELECT *FROM Client WHERE email = $1',
                        values: [email],
                    };
                    cbQuery(query, callback)
                },
                function (data: any, callback: (e: Event | Error | null, result?:any) => void) {
                    if (data.length != 0) {
                        callback(new authError("Пользователь уже существует"));
                    } else {
                        pool.query({
                            text: 'INSERT INTO Client(nick, email, hashedPassword, salt) VALUES($1, $2, $3, $4)',
                            values: [nick, email, password, 'salt']
                        }, (err: Error, result: any) => {
                            if (err) console.log(err);
                            callback(null, result.rows);
                        });
                    }
                }
            ], callback);
        }
    }


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


    module.exports = {
        pool,
        DB,
        User,
        authError
    };
}
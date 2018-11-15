const util = require('util');
const {Pool} = require('pg');
const config = require('../config/config.json');

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

    static createAllTables() {
        console.log("Start create tables!");
        let query = ``;
        query += `CREATE TABLE IF NOT EXISTS Country(
        id SERIAL PRIMARY KEY,
        name varchar(100) UNIQUE
        );`;
        query += `CREATE TABLE IF NOT EXISTS City(
        id SERIAL PRIMARY KEY,
        name varchar(100) UNIQUE,
        country_id bigint NOT NULL,
        FOREIGN KEY(country_id) REFERENCES Country(id) ON DELETE CASCADE
        );`;
        query += `CREATE TABLE IF NOT EXISTS Client (
        id SERIAL PRIMARY KEY,
        nick varchar(20) NOT NULL UNIQUE,
        email varchar(40) NOT NULL UNIQUE,
        hashed_password varchar(50) NOT NULL,
        salt varchar(100) NOT NULL,
        created timestamp DEFAULT CURRENT_TIMESTAMP
        );`;
        query += `CREATE TABLE IF NOT EXISTS Category(
        id SERIAL PRIMARY KEY,
        name varchar(50)  NOT NULL,
        id_parent bigint,
        FOREIGN KEY(id_parent) REFERENCES Category(id) ON DELETE CASCADE
        );`;
        query += `CREATE TABLE IF NOT EXISTS Vacancy(
        id SERIAL PRIMARY KEY,
        company varchar(50),
        type varchar(30),
        logo varchar(1000),
        url varchar(1000),
        position varchar(100),
        description text,
        is_public BIT NOT NULL,
        phone varchar(100),
        price bigint,
        token varchar(50),
        created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        creator_id bigint  NOT NULL,
        FOREIGN KEY(creator_id) REFERENCES Client(id) ON DELETE CASCADE,
        category_id bigint,
        FOREIGN KEY(category_id) REFERENCES Category(id) ON DELETE SET NULL,
        city_id bigint,
        FOREIGN KEY(city_id) REFERENCES City(id) ON DELETE SET NULL
        );`;
        query += `CREATE TABLE IF NOT EXISTS Resume(
        id SERIAL PRIMARY KEY,
        name varchar(50),
        surname varchar(50),
        age smallint,
        type varchar(50),
        position varchar(100),
        description text,
        is_public BIT NOT NULL,
        city_id bigint,
        FOREIGN KEY(city_id) REFERENCES City(id) ON DELETE SET NULL,
        category_id bigint,
        creator_id bigint NOT NULL UNIQUE,
        FOREIGN KEY(creator_id) REFERENCES Client(id) ON DELETE CASCADE
        );`;
        query += `CREATE TABLE IF NOT EXISTS History(
        id SERIAL PRIMARY KEY,
        is_favorite BIT NOT NULL,
        id_user bigint NOT NULL,
        FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,
        id_vacancy bigint,
        FOREIGN KEY(id_vacancy) REFERENCES Vacancy(id) ON DELETE CASCADE,
        id_resume bigint,
        FOREIGN KEY(id_resume) REFERENCES Resume(id) ON DELETE CASCADE
        );`;
        query += `CREATE TABLE IF NOT EXISTS Filters(
        id SERIAL PRIMARY KEY,
        id_user bigint NOT NULL,
        FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,
        type BIT NOT NULL,
        city_id bigint,
        country_id bigint,
        category_id bigint,
        price_from bigint,
        price_to bigint
        );`;
        query += `CREATE TABLE IF NOT EXISTS Companion(
        id SERIAL PRIMARY KEY,
        id_user bigint NOT NULL,
        FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,
        id_companion bigint NOT NULL,
        FOREIGN KEY(id_companion) REFERENCES Client(id) ON DELETE CASCADE,
        token varchar(50)
        );`;


        query += `ALTER TABLE History
        ADD CONSTRAINT HistoryVacancy UNIQUE(id_user, id_vacancy, is_favorite);`;
        query += `ALTER TABLE History
        ADD CONSTRAINT HistoryResume UNIQUE(id_user, id_resume, is_favorite);`;


        //type 1 - vacancy 0 - resume

        pool.query(query, (err: Error, _: any) => {
            if (err) console.log(err);
            console.log("All tables created!");
            DB.showAllTables()
                .then((result: any) => {
                    console.log(result);
                })
        });
    }
}


function getQueryInsert(tableName: string, obj: { [key: string]: any }) {
    let str1 = ``;
    let str2 = ``;
    let values = [];
    let i = 2;
    for (let key in obj) {
        if (str1 !== ``) {
            str1 += `, ` + key;
            str2 += `, $${i}`;
            i++;
        }
        else {
            str1 = key;
            str2 = `$1`
        }
        values.push(obj[key])
    }
    return {text: `INSERT INTO ${tableName} (${str1}) VALUES (${str2});`, values: values}
}


function cbQuery(query: string | { text: string, values: any[] }, callback: (e: Event | null, result: any) => void) {
    pool.query(query, (err: Error, result: any) => {
        if (err) console.log(err);
        callback(null, result.rows);
    });
}

function InOrEqualArrQuery(find: string, query: string) {
    if (query && query.length > 0 && query[0] === '[' && query[query.length - 1] === ']')
        return ` ${find} IN (${query.substring(1, query.length - 1)}) `;
    else return ` ${find} = ${query} `
}


interface _authError extends Event {
    message: string
}

const authError = function (this: _authError, message: string) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, authError);
    this.message = message
} as  any as{ new (message: string): _authError; };
util.inherits(authError, Error);
authError.prototype.name = 'authError';


export {
    pool,
    DB,
    authError,
    getQueryInsert,
    cbQuery,
    InOrEqualArrQuery
}

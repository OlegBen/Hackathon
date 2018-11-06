namespace DataBasePG {
    const async = require('async');
    const {Pool, Client} = require('pg');
    const config = require('../../config/config.json');


    const connectionString = config.postgresSql;
    const pool = new Pool({
        connectionString: connectionString,
        ssl: true
    });

    function createALL(callback: (e: Event) => void) {
        async.waterfall([
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS Country(\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    name varchar(100)\n' +
                    ');', callback)
            },
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS City(\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    name varchar(100),\n' +
                    '    id_country bigint,\n' +
                    '    FOREIGN KEY(id_country) REFERENCES Country(id) ON DELETE CASCADE\n' +
                    ');');
                callback()
            },
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS Location(\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    name varchar(100),\n' +
                    '    id_city bigint,\n' +
                    '    FOREIGN KEY(id_city) REFERENCES City(id) ON DELETE CASCADE\n' +
                    ');', callback);
            },
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS Client (\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    nick varchar(20) NOT NULL,\n' +
                    '    email varchar(40) NOT NULL,\n' +
                    '    hashedPassword varchar(50) NOT NULL,\n' +
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
                cbQuery('CREATE TABLE IF NOT EXISTS Category(\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    name varchar(50)  NOT NULL\n' +
                    ');', callback);
            },
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS SubCategory(\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    name varchar(50)  NOT NULL,\n' +
                    '    id_category bigint  NOT NULL,\n' +
                    '    FOREIGN KEY(id_category) REFERENCES Category(id) ON DELETE CASCADE\n' +
                    ');', callback);
            },
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS Vacancy(\n' +
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
                cbQuery('CREATE TABLE IF NOT EXISTS Resume(\n' +
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
                cbQuery('CREATE TABLE IF NOT EXISTS HistoryVacancy(\n' +
                    '    id SERIAL PRIMARY KEY,\n' +
                    '    isFavorite BIT  NOT NULL,\n' +
                    '    id_user bigint  NOT NULL,\n' +
                    '    FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n' +
                    '    id_vacancy bigint  NOT NULL,\n' +
                    '    FOREIGN KEY(id_vacancy) REFERENCES Vacancy(id)\n' +
                    ');', callback);
            },
            function (callback: () => void) {
                cbQuery('CREATE TABLE IF NOT EXISTS HistoryResume(\n' +
                    '    id SERIAL,\n' +
                    '    isFavorite BIT  NOT NULL,\n' +
                    '    id_user bigint  NOT NULL,\n' +
                    '    FOREIGN KEY(id_user) REFERENCES Client(id) ON DELETE CASCADE,\n' +
                    '    id_resume bigint  NOT NULL,\n' +
                    '    FOREIGN KEY(id_resume) REFERENCES Resume(id)\n' +
                    ');', callback);
            }

        ], callback);
    }


    function dropTable(name: string) {
        return new Promise((resolve: any, reject: any) => {
            pool.query(`DROP TABLE IF EXISTS ${name}`, (err: Error, result: any) => {
                resolve();
            });
        });
    }

    function cbQuery(query: string, callback?: () => void) {
        pool.query(query, (err: Error, result: any) => {
            if (err) console.log(err);
            if (callback) callback();
        });
    }


    function showAllTables() {
        pool.query(`SELECT table_name  FROM information_schema.tables WHERE table_schema='public'`, (err: Error, result: any) => {
            console.log(result.rows)
        });
    }

    module.exports = {
        pool,
        createALL,
        dropTable,
        showAllTables
    };

}
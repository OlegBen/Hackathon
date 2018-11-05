// @ts-ignore
const {Pool, Client} = require('pg');

const connectionString = "postgres://icpssnhvmdpzon:ebbbfef330eb2e55805919a9b007b3fd4a6e5a6b3433dc6b2a733bb08db05d43@ec2-79-125-14-195.eu-west-1.compute.amazonaws.com:5432/dcd6vknj3896b4";

const pool = new Pool({
    connectionString: connectionString,
    ssl: true
});

function createALL() {
    createTable('Test', [
        'name VARCHAR(40)'
    ]);
}


function dropTable(name: string) {
    return new Promise((resolve: any, reject: any) => {
        pool.query(`DROP TABLE IF EXISTS ${name}`, (err: Error, result: any) => {
            resolve();
        });
    });
}

function createTable(name: string, arr: any[]) {
    return new Promise((resolve: any, reject: any) => {
        pool.query(`CREATE TABLE IF NOT EXISTS ${name}(${arr.toString()})`, (err: Error, result: any) => {
            resolve();
        });
    });
}


function showAllTables() {
    return new Promise((resolve: any, reject: any) => {
        pool.query(`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`, (err: Error, result: any) => {
            resolve(result.rows)
        });
    })
}

module.exports = {
    pool,
    createALL,
    dropTable,
    createTable,
    showAllTables
};

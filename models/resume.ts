import {_Resume} from "./interfaces";

const {cbQuery, pool, authError} = require('./base');

class Resume {
    static create(data: any) {

        pool.query({
            text: 'INSERT INTO Resume(name,surname, age, type, position, location_id, sub_category_id, description,' +
            ' is_public,   creator_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
            values: [data.name, data.surname, data.age, data.type, data.position, data.location_id, data.sub_category_id, data.description,
                data.is_public,  data.creator_id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query:any,countInPage:number, callback: ( resumeArr: _Resume[], countInPage:number) => void) {
        //page
        //count
        //query
        let queryStr = 'SELECT *FROM Resume WHERE is_public = $1';
        let queryVal = [1];
        if(query.creatorId) {
            queryStr += ' AND creator_id = $2';
            queryVal.push(query.creator_id)
        }

        pool.query({
            text: queryStr + ';',
            values: queryVal,
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            callback( result.rows, countInPage);
        });
    }

    static findById(id: number, callback: (resume: _Resume | null) => void) {
        pool.query({
            text: 'SELECT *FROM Resume WHERE id = $1;',
            values: [id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result && result.rows.length > 0)
                callback(result.rows[0]);
            else
                callback(null);
        });
    }

    static deleteOne(id: number) {
        pool.query({
            text: 'DELETE FROM Resume WHERE id = $1;',
            values: [id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }
}

module.exports = Resume;
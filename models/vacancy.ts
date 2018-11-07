import {_Vacancy} from "./interfaces";

const {cbQuery, pool, authError} = require('./base');

class Vacancy {
    static create(data: _Vacancy) {
        pool.query({
            text: 'INSERT INTO Vacancy(company, type, url, logo, position, location_id, sub_category_id, description,' +
            ' is_public,  creator_id, token) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
            values: [data.company, data.type, data.url, data.logo, data.position, data.location_id, data.sub_category_id, data.description,
                data.is_public, data.creator_id, data.token],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query: any, countInPage: number, callback: (vacancyArr: _Vacancy[], countInPage: number) => void) {
        //page
        //count
        //query
        //console.log(query);
        let queryStr = 'SELECT *FROM Vacancy WHERE is_public = $1';
        let queryVal = [1];
        if (query.creator_id) {
            queryStr += ' AND creator_id = $2';
            queryVal.push(query.creator_id)
        }

        pool.query({
            text: queryStr + ';',
            values: queryVal,
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            callback(result.rows, countInPage);
        });
    }

    static findById(id: number, callback: (vacancy: _Vacancy | null) => void) {
        pool.query({
            text: 'SELECT *FROM Vacancy WHERE id = $1;',
            values: [id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result && result.rows.length > 0)
                callback(result.rows[0]);
            else
                callback(null);
        });
    }

    static updateOne(id: number, data:_Vacancy) {

        pool.query({
            text: 'UPDATE Vacancy SET company = $1 , type = $2 , url = $3 , logo = $4 , position = $5 , location_id = $6 , ' +
            'sub_category_id = $7 , description = $8 , is_public = $9 , phone = $10 , token = $11  WHERE id = $12;',
            values: [data.company, data.type, data.url, data.logo,
                data.position, data.location_id, data.sub_category_id, data.description,
                data.is_public, data.phone, data.token, id],
        }, (err: Error, result: any) => {
            if(err) console.log(err);
            console.log(result)
        });


    }

    static deleteOne(id: number) {
        pool.query({
            text: 'DELETE FROM Vacancy WHERE id = $1;',
            values: [id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }
}

module.exports = Vacancy;
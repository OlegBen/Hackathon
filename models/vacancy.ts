import {getQueryInsert, pool} from "./base";


class Vacancy {
    static create(data: _Vacancy) {
        pool.query(getQueryInsert('Vacancy', data), (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query: any, countInPage: number, callback: (vacancyArr: _Vacancy[], countInPage: number) => void) {
        //page
        //count
        //query
        //console.log(query);
        let queryStr = 'SELECT *FROM Vacancy WHERE ';
        let queryVal = [];
        if (query.creator_id) {
            queryStr += 'creator_id = $1';
            queryVal.push(query.creator_id)
        }
        else {
            queryStr += 'is_public = $1';
            queryVal.push(1);
        }
        let paginateStr = query.page ? ` LIMIT ${countInPage} OFFSET ${query.page * countInPage}` : '';
        pool.query({
            text: queryStr + `${paginateStr};`,
            values: queryVal,
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result) {
                pool.query('SELECT COUNT(*) FROM Vacancy;', (err: Error, count: any) => {
                    callback(result.rows, Math.ceil(count.rows[0].count / countInPage));
                })
            }
            else
                callback([], 0)
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

    static updateOne(id: number, data: _Vacancy) {
        pool.query({
            text: 'UPDATE Vacancy SET company = $1 , type = $2 , url = $3 , logo = $4 , position = $5 , location_id = $6 , ' +
            'sub_category_id = $7 , description = $8 , is_public = $9 , phone = $10 , token = $11  WHERE id = $12;',
            values: [data.company, data.type, data.url, data.logo,
                data.position, data.location_id, data.sub_category_id, data.description,
                data.is_public, data.phone, data.token, id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static deleteOne(id: number, creator_id: number) {
        pool.query({
            text: 'DELETE FROM Vacancy WHERE id = $1 AND creator_id = $2;',
            values: [id, creator_id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }
}

export default Vacancy;

export interface _Vacancy {
    id?: string
    company: string
    type: string
    logo?: string
    url?: string
    position: string
    location_id: number
    sub_category_id: number
    description: string
    is_public: number

    phone?: string
    creator_id: number
    token?: string
}
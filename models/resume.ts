import {pool, getQueryInsert} from "./base";


class Resume {
    static create(data: _Resume) {
        pool.query(getQueryInsert('Resume', data), (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query: any, countInPage: number, callback: (resumeArr: _Resume[], countInPage: number) => void) {
        //page
        //count
        //query
        let queryStr = 'SELECT *FROM Resume WHERE ';
        let queryVal = [];
        if (query.creator_id) {
            queryStr += 'creator_id = $1';
            queryVal.push(query.creator_id)
        }
        else {
            queryStr += 'is_public = $1';
            queryVal.push(1);
        }


        pool.query({
            text: queryStr + ';',
            values: queryVal,
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result) {
                pool.query('SELECT COUNT(*) FROM Resume;', (err: Error, count: any) => {
                    callback(result.rows, Math.ceil(count.rows[0].count / countInPage));
                })
            } else
                callback([], 0);
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

    static updateOne(id: number, data: _Resume) {
        pool.query({
            text: 'UPDATE Resume SET name = $1 , surname = $2 , age = $3 , type = $4 , position = $5 , city_id = $6 , ' +
            'description = $7 , is_public = $8 WHERE id = $9;',
            values: [data.name, data.surname, data.age, data.type,
                data.position, data.city_id, data.description,
                data.is_public, id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            console.log(result)
        });
    }

    static deleteOne(id: number, creator_id: number) {
        pool.query({
            text: 'DELETE FROM Resume WHERE id = $1 AND creator_id = $2;',
            values: [id, creator_id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }
}

export default Resume;

export interface _Resume {
    id?: number
    name: string
    surname: string
    age: number
    type: string
    position: string
    city_id: number | null
    category_id: number | null
    description: string
    is_public: number

    creator_id: number
}
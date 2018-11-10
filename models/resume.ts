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
            text: 'UPDATE Resume SET name = $1 , surname = $2 , age = $3 , type = $4 , position = $5 , location_id = $6 , ' +
            'sub_category_id = $7 , description = $8 , is_public = $9 WHERE id = $10;',
            values: [data.name, data.surname, data.age, data.type,
                data.position, data.location_id, data.sub_category_id, data.description,
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

    static addToHistory(id_user: number, id_resume: number, isFavorite:Boolean) {

        pool.query({
            text: 'SELECT *FROM HistoryResume WHERE id_user = $1 AND id_resume = $2;',
            values: [id_user, id_resume]
        }, (err: Error, result: any) => {
            if(err) console.log(err);
            if(!result){
                pool.query({
                    text: 'INSERT INTO HistoryResume (id_user, id_resume) VALUES ($1,$2);',
                    values: [id_user, id_resume]
                }, (err2:Error, result2:any)=>{
                    if(err2) console.log(err2);
                })
            } else if(result.rows && result.rows.length > 0){
                console.log(result.rows[0]);
            }
        })

    }
}

export default Resume;

export interface _Resume {
    id?: string
    name: string
    surname: string
    age: number
    type: string
    position: string
    location_id: number | null
    city_id: number | null
    country_id: number | null
    category_id: number | null
    sub_category_id: number | null
    description: string
    is_public: number

    creator_id: number
}
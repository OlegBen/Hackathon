import { pool, getQueryInsert} from "./base";




class Resume {
    static create(data: _Resume) {

        pool.query(getQueryInsert('Resume', data), (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query:any,countInPage:number, callback: ( resumeArr: _Resume[], countInPage:number) => void) {
        //page
        //count
        //query
        let queryStr = 'SELECT *FROM Resume WHERE ';
        let queryVal = [];
        if (query.creator_id) {
            queryStr += 'creator_id = $1';
            queryVal.push(query.creator_id)
        }
        else{
            queryStr += 'is_public = $1';
            queryVal.push(1);
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

export default Resume;

export interface _Resume {
    id?: string
    name: string
    age: number
    type: string
    position: string
    location_id: number
    sub_category_id: number
    description: string
    is_public: number

    creator_id: number
}
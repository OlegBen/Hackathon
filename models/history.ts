import {pool} from "./base";

interface _Error extends Error {
    code: number
}

class History {
    static add(is_favorite: Boolean, id_user: number, id_vacancy: number | null, id_resume: number | null) {
        pool.query({
            text: 'INSERT INTO History (is_favorite, id_user, id_vacancy ,id_resume) VALUES($1, $2, $3, $4)',
            values: [is_favorite ? 1 : 0, id_user, id_vacancy, id_resume]
        }, (err: _Error, _: any) => {
            if (err) {
                if (err.code == 23505)
                    console.log('Duplicate History');
                else
                    console.log(err)
            }
        });
    }

    static getHistory(id_user: number, t_vacancy_f_resume: Boolean, callback: (result:Event | _History[]) => void) {
        pool.query({
            text: `SELECT *FROM History WHERE is_favorite = $1 AND id_user = ${id_user} AND id_vacancy = $2`,
            values: [0, t_vacancy_f_resume ? 1 : 0]
        }, (err: _Error, result: any) => {
            if (err) console.log(err);
            callback(result)
        });
    }

    static getFavorites(id_user: number, vacancy_or_resume: Boolean, callback: (result:_History[]) => void) {
        pool.query({
            text: `SELECT *FROM History WHERE is_favorite = $1 AND id_user = ${id_user}`,
            values: [1]
        }, (err: _Error, result: any) => {
            if (err) console.log(err);
            callback(result)
        });
    }
}


interface _History {
    is_favorite: number
    id_user:number
    id_vacancy:number | null
    id_resume:number | null
}

export {History, _History}
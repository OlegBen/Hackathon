import {pool} from "./base";


class Filters {
    static add(id_user: number, obj: _Filters) {
        let str1 = 'id_user';
        let str2 = '$1, ';
        let values = [id_user];
        let count = 1;
        for(let key in obj){
            str1+= `, ${key}`;
            str2+= `, ${count}`;
            values.push(obj[key])
        }
        pool.query({
            text: `INSERT INTO Filters (${str1}) VALUES(${str2})`,
            values:values
        }, (err: Error, _: any) => {
            if (err) console.log(err)
        });
    }

    static getFilters(id_user: number, t_vacancy_f_resume: Boolean, callback: (result: Event | _Filters[]) => void) {
        pool.query({
            text: `SELECT *FROM Filters WHERE id_user = $1 AND id_user = ${id_user} AND type = $2`,
            values: [id_user, t_vacancy_f_resume ? 1 : 0]
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            callback(result)
        });
    }
}


interface _Filters {
    [key:string]:any
    city_id?: number,
    country_id?: number,
    category_id?: number,
    price_from?: number,
    price_to?: number
}

export {Filters, _Filters}
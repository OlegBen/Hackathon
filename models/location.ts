import {pool} from "./base";


class Location {
    static createCity(name: string, idCountry: number) {
        if (name && idCountry)
            pool.query({
                text: 'INSERT INTO City (name, country_id) VALUES($1, $2);',
                values: [name, idCountry],
            }, (err: Error, result: any) => {
                if (err) console.log(err);
            });
        else
            console.error('create city error')
    }

    static createCountry(name: string) {
        if (name)
            pool.query({
                text: 'INSERT INTO Country (name) VALUES($1);',
                values: [name],
            }, (err: Error, result: any) => {
                if (err) console.log(err);
            });
        else
            console.error('createCountry error')
    }

    static showAllCitysFromCountry(idCountry: number, callback: (data: any[] | null) => void) {
        pool.query({
            text: 'SELECT *FROM City WHERE country_id = $1;',
            values: [idCountry]
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null)
        });
    }

    static showAllCountrys(callback: (data: any[] | null) => void) {
        pool.query('SELECT *FROM Country;', (err: Error, result: any) => {
            if (err) console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null)
        });
    }
}

export default Location;


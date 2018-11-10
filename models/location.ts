import {pool} from "./base";


class Location {
    static createLocation(name: string, idCity: number) {
        if (name && idCity)
            pool.query({
                text: 'INSERT INTO Location (name, id_city) VALUES($1, $2);',
                values: [name, idCity],
            }, (err: Error, result: any) => {
                if (err) console.log(err);
            });
        else
            console.error('create loc error')
    }

    static createCity(name: string, idCountry: number) {
        if (name && idCountry)
            pool.query({
                text: 'INSERT INTO City (name, id_country) VALUES($1, $2);',
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

    static showAllLocationsFromCity(idCity: number, callback: (data: any[] | null) => void) {
        pool.query({
            text: 'SELECT *FROM Location WHERE id_city = $1;',
            values: [idCity]
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null)
        });
    }

    static showAllCitysFromCountry(idCountry: number, callback: (data: any[] | null) => void) {
        pool.query({
            text: 'SELECT *FROM City WHERE id_country = $1;',
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


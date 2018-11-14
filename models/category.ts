import {pool} from "./base";


class Category {
    static create(name: string) {
        pool.query({
            text: 'INSERT INTO Category (name) VALUES($1);',
            values: [name],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static createSub(name: string, id_parent: number) {
        pool.query({
            text: 'INSERT INTO Category (name, id_parent) VALUES($1, $2);',
            values: [name, id_parent],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static showAll(callback: (data: any[] | null) => void) {
        pool.query('SELECT *FROM Category WHERE id_parent IS NULL;', (err: Error, result: any) => {
            if (err) console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null)
        });
    }

    static showAllSub(id_parent: number, callback: (data: any[] | null) => void) {
        pool.query({
            text: 'SELECT *FROM Category WHERE id_parent = $1;',
            values: [id_parent]
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null)
        });
    }
}

export default Category;
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

    static createSub(name: string, idCategory: number) {
        pool.query({
            text: 'INSERT INTO SubCategory (name, id_category) VALUES($1, $2);',
            values: [name, idCategory],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static showAll(callback: (data: any[] | null) => void) {
        pool.query('SELECT *FROM Category;', (err: Error, result: any) => {
            if (err) console.log(err);
            if (result)
                callback(result.rows);
            else
                callback(null)
        });
    }

    static showAllSub(category_id: number, callback: (data: any[] | null) => void) {
        pool.query({
            text: 'SELECT *FROM SubCategory WHERE id_category = $1;',
            values: [category_id]
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
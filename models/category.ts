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

    static showAll(callback: (err: Error | Event | null, data?: any[]) => void) {
        pool.query('SELECT *FROM Category;', (err: Error, result: any) => {
            if (err) console.log(err);
            callback(null, result.rows);
        });
    }

    static showAllSub(callback: (err: Error | Event | null, data?: any[]) => void) {
        pool.query('SELECT *FROM SubCategory;', (err: Error, result: any) => {
            if (err) console.log(err);
            callback(null, result.rows);
        });
    }
}

export default Category;
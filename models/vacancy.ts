import {getQueryInsert, pool} from "./base";


class Vacancy {
    static create(data: _Vacancy) {
        pool.query(getQueryInsert('Vacancy', data), (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query: any, countInPage: number, callback: (vacancyArr: _Vacancy[], countInPage: number) => void) {
        //page
        //count
        //query
        //console.log(query);
        let where = '';
        let queryVal: string[] = [];
        let countWhere = 1;
        if (query.creator_id) {
            where += `WHERE creator_id = $${countWhere}`;
            queryVal.push(query.creator_id)
            countWhere++;
        }
        else {
            where += 'WHERE is_public = $1';
            queryVal.push('1');
            countWhere++;
        }
        if (query.sub_category_id) {
            where += ` AND sub_category_id = $${countWhere}`;
            queryVal.push(query.sub_category_id);
            countWhere++;
        }
        if (query.category_id) {
            where += ` AND category_id =  $${countWhere}`;
            queryVal.push(query.category_id);
            countWhere++;
        }
        if (query.city_id) {
            where += ` AND city_id =  $${countWhere}`;
            queryVal.push(query.city_id);
            countWhere++;
        }
        if (query.country_id) {
            where += ` AND country_id =  $${countWhere}`;
            queryVal.push(query.country_id);
            countWhere++;
        }
        if (query.location_id) {
            where += ` AND location_id =  $${countWhere}`;
            queryVal.push(query.location_id);
            countWhere++;
        }

        let limitOffset = query.page ? ` LIMIT ${countInPage} OFFSET ${query.page * countInPage}` : '';
        let join = 'INNER JOIN Client ON v.creator_id = Client.id';
        join +=
            ' LEFT  JOIN SubCategory ON v.sub_category_id = SubCategory.id' +
            ' LEFT  JOIN Category ON SubCategory.id_category = Category.id ';
        join +=
            'LEFT  JOIN Location ON v.location_id = Location.id' +
            ' LEFT  JOIN City ON Location.id_city = City.id' +
            ' LEFT  JOIN Country ON City.id_country = Country.id';
        let select = 'v.company, v.type, v.logo, v.url, v.position, v.description, v.is_public, ' +
            'v.created, v.phone, v.sub_category_id, v.location_id, ' +
            'SubCategory.name as sub_category_name, Category.name as category_name, ' +
            'Location.name as location_name, City.name as city_name, City.id, Country.name as country_name, Country.id, Client.email, v.id';
        let order = 'ORDER BY v.id';
        pool.query({
            text: `SELECT ${select} FROM Vacancy AS v ${join} ${where} ${order} ${limitOffset};`,
            values: queryVal,
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result) {
                pool.query({
                    text: `SELECT COUNT(*) FROM Vacancy ${where};`,
                    values: queryVal
                }, (err: Error, result2: any) => {
                    if (err) console.log(err);
                    callback(result.rows, Math.ceil(result2.rows[0].count / countInPage));
                })
            }
            else
                callback([], 0)
        });
    }

    static findById(id: number, callback: (vacancy: _Vacancy | null) => void) {
        pool.query({
            text: 'SELECT *FROM Vacancy WHERE id = $1;',
            values: [id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result && result.rows.length > 0)
                callback(result.rows[0]);
            else
                callback(null);
        });
    }

    static updateOne(id: number, data: _Vacancy) {
        pool.query({
            text: 'UPDATE Vacancy SET company = $1 , type = $2 , url = $3 , logo = $4 , position = $5 , location_id = $6 , ' +
            'sub_category_id = $7 , description = $8 , is_public = $9 , phone = $10 , token = $11  WHERE id = $12;',
            values: [data.company, data.type, data.url, data.logo,
                data.position, data.location_id, data.sub_category_id, data.description,
                data.is_public, data.phone, data.token, id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static deleteOne(id: number, creator_id: number) {
        pool.query({
            text: 'DELETE FROM Vacancy WHERE id = $1 AND creator_id = $2;',
            values: [id, creator_id],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }
}

export default Vacancy;

export interface _Vacancy {
    id?: string
    company: string
    type: string
    logo?: string
    url?: string
    position: string
    location_id: number | null
    city_id:number | null
    country_id:number | null
    category_id:number | null
    sub_category_id: number | null
    description: string
    is_public: number

    phone?: string
    creator_id: number
    token?: string
}
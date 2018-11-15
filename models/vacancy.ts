import {getQueryInsert, InOrEqualArrQuery, pool} from "./base";



class Vacancy {
    static create(data: _Vacancy) {
        pool.query(getQueryInsert('Vacancy', data), (err: Error, result: any) => {
            if (err) console.log(err);
        });
    }

    static getAllPublicQuery(query: any, countInPage: number, callback: (vacancyArr: _Vacancy[], countInPage: number) => void) {
        const country = query.country_id;
        const city = query.city_id;
        const category = query.category_id;
        const sub_category = query.sub_category_id;

        let where = '';
        const queryValues:any[] = [];
        if (query.creator_id)
            where += `WHERE creator_id = ${query.creator_id}`;
        else {
            where += `WHERE is_public = $1`;
            queryValues.push('1');
        }
        if (sub_category)
            where += ` AND ${InOrEqualArrQuery('category_id', sub_category)}`;
        else if (category)
            where += ` AND category_id IN (SELECT id FROM Category WHERE ${InOrEqualArrQuery('category_id', category)})`;


        if (city)
            where += ` AND ${InOrEqualArrQuery('city_id', city)}`;
        else if (country)
            where += ` AND city_id IN (SELECT id FROM City WHERE ${InOrEqualArrQuery('country_id', country)})`;


        let limitOffset = query.page ? ` LIMIT ${countInPage} OFFSET ${query.page * countInPage}` : '';
        let join = 'INNER JOIN Client ON v.creator_id = Client.id';
        join +=
            ' LEFT JOIN Category AS SubCategory ON v.category_id = SubCategory.id' +
            ' LEFT JOIN Category Category ON SubCategory.id_parent = Category.id';
        join +=
            ' LEFT JOIN City ON v.city_id = City.id' +
            ' LEFT JOIN Country ON City.country_id = Country.id';
        let select =
            'v.company, v.type, v.logo, v.url, v.position, v.description, v.is_public, ' +
            'v.created, v.phone, v.category_id,  ' +
            'SubCategory.name as sub_category_name, Category.name as category_name, ' +
            'City.name as city_name, City.id as city_id, Country.name as country_name, Country.id as country_id, Client.email, v.id';
        let order = 'ORDER BY v.id';


        pool.query({
            text: `SELECT ${select} FROM Vacancy AS v ${join} ${where} ${order} ${limitOffset};`,
            values: queryValues,
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result) {
                pool.query({
                    text: `SELECT COUNT(*) FROM Vacancy ${where};`,
                    values: queryValues
                }, (err: Error, result2: any) => {
                    if (err) console.log(err);
                    callback(result.rows, Math.ceil(result2.rows[0].count / countInPage));
                })
            }
            else {
                callback([], 0)
            }
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
            text: 'UPDATE Vacancy SET company = $1 , type = $2 , url = $3 , logo = $4 , position = $5 , city_id = $6 , ' +
            'description = $7 , is_public = $8 , phone = $9 , token = $10  WHERE id = $11;',
            values: [data.company, data.type, data.url, data.logo,
                data.position, data.city_id, data.description,
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

    static checkCompanionToken(id_companion:number, token:string, callback:(id_user: number | null)=>void){
        pool.query({
            text: 'SELECT id_user FROM Companion WHERE id_companion = $1 AND token = $2;',
            values: [id_companion, token],
        }, (err: Error, result: any) => {
            if (err) console.log(err);
            if (result && result.rows.length > 0)
                callback(result.rows[0]);
            else
                callback(null);
        });
    }
}

export default Vacancy;

export interface _Vacancy {
    id?: number
    company: string
    type: string
    logo?: string
    url?: string
    position: string
    city_id: number | null
    category_id: number | null
    description: string
    is_public: number

    phone?: string
    creator_id: number
    token?: string
}
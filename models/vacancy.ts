const async = require('async');
const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
const util = require('util');

export interface _Vacancy {
    _id?: string
    company: string
    type: string
    logo?: string
    url?: string
    position: string
    location: string
    category: string
    description: string
    isPublic: Boolean
    email: string
    phone?: string

    creatorId: string
    created: Date
    token?: string
}

const schema = new Schema({
    company: {type: String, required: true},
    type: {type: String, required: true},
    logo: {type: String},
    url: {type: String},
    position: {type: String, required: true},
    location: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    email: {type: String, required: true},
    phone: {type: String},

    created: {type: Date, default: Date.now},
    creatorId: {type: String, required: true},
    token: {type: String}
});

schema.statics.create = function (data: _Vacancy, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (vacancy?: any) => void) {
            const vacancy = new Vacancy(data);
            vacancy.save(function (err: Error) {
                if (err) return callback(err);
                callback(vacancy)
            })
        }
    ], callback);
};

schema.statics.getOne = function (_id: string, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (vacancy?: any) => void) {
            Vacancy.findOne({_id: _id}, {
                company: true,
                type: true,
                url: true,
                logo: true,
                position: true,
                description: true,
                location: true,
                category: true,
                phone: true,
                email: true,
                state: true,
                created: true,
                creatorId: true
            }, (err: Error, result: _Vacancy[]) => {
                callback(result)
            })
        }
    ], callback);
};

schema.statics.getAllForId = function (userId: string, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (vacancy?: any) => void) {
            Vacancy.find({creatorId: userId}, (err: Error, result: _Vacancy[]) => {
                callback(result)
            })
        }
    ], callback);
};

interface _findAllForFilter {
    isPublic: boolean
    category?: string
    location?: string
}

schema.statics.getPageForPublic = function (page: number = 0, filter: any, countInPage: number, callback: (e: Event) => void) {
    const Vacancy = this;
    const findSettings: _findAllForFilter = {isPublic: true};
    if (filter.category && filter.category !== 'undefined')
        findSettings.category = filter.category;
    if (filter.location && filter.location !== 'undefined')
        findSettings.location = filter.location;

    async.waterfall([
        function (callback: (e: Event) => void) {
            Vacancy.count(findSettings, callback);
        },
        function (allCount: number, callback: (vacancy: any, allCount: number) => void) {
            Vacancy.find(findSettings, {
                company: true,
                type: true,
                logo: true,
                position: true,
                description: true,
                location: true,
                category: true,
                phone: true,
                email: true,
                state: true
            }, {
                skip: page * countInPage,
                limit: countInPage
            }, (err: Error, result: _Vacancy[]) => {
                callback(result, Math.ceil(allCount / countInPage))
            })
        }
    ], callback);
};


schema.statics.UpdateOne = function (vacancy: _Vacancy, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            Vacancy.findOne({_id: vacancy._id}, callback);
        },
        function (findVacancy: any, callback: (vacancy?: any) => void) {
            if (findVacancy.creatorId == vacancy.creatorId) {
                Vacancy.updateOne({_id: vacancy._id}, vacancy, (err: Error) => {
                    callback(vacancy)
                })
            } else {
                callback(new vacancyError("У вас нет прав"));
            }
        }
    ], callback);
};

schema.statics.delete = function (_id: string, userId: string, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            Vacancy.findOne({_id: _id}, callback);
        },
        function (vacancy: any, callback: (e: Event | null, isDelete?: Boolean) => void) {
            if (vacancy) {
                if (vacancy.creatorId == userId) {
                    vacancy.remove();
                    callback(null, true)
                } else
                    callback(new vacancyError("У вас нет прав"));
            }
            else
                callback(new vacancyError("Вакансия не найдена"));
        }
    ], callback);
};

export const Vacancy = mongoose.model('Vacancy', schema);

interface vacancyError extends Event {
    message: string
}

const vacancyError = function (this: vacancyError, message: string) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, vacancyError);
    this.message = message
} as  any as{ new (message: string): vacancyError; };

util.inherits(vacancyError, Error);
vacancyError.prototype.name = 'vacancyError';


module.exports = {vacancyError, Vacancy};

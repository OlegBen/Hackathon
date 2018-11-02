const async = require('async');
const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
const util = require('util');

export interface _Vacancy {
    company: string
    type: string
    logo?: string
    url?: string
    position: string
    location: string
    category: string
    description: string
    interview: string
    isPublic: Boolean
    email: string

    creatorId: string
    state: string
    created: Date
}

const schema = new Schema({
    company: {type: String, required: true},
    type: {type: String, required: true},
    logo: {type: String},
    url: {type: String},
    position: {type: String, required: true},
    location: {type: String, required: true},
    category: {type: [], required: true},
    description: {type: String, required: true},
    interview: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    email: {type: String, required: true},

    state: {type: String},
    created: {type: Date, default: Date.now},
    creatorId: {type: String, required: true}
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

schema.statics.getAll = function (userId: string, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (vacancy?: any) => void) {
            Vacancy.find({creatorId: userId}, (err: Error, result: _Vacancy[]) => {
                callback(result)
            })
        }
    ], callback);
};

schema.statics.delete = function (_id: number, callback: (e: Event) => void) {
    const Vacancy = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            Vacancy.findOne({_id: _id}, callback);
        },
        function (vacancy: any, callback: (e: Event | null, isDelete?: Boolean) => void) {
            if (vacancy) {
                vacancy.remove();
                callback(null, true)
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

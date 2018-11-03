const async = require('async');
const mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;
const util = require('util');

export interface _Resume {
    _id?: string
    name: string
    age:number
    type: string
    position: string
    location: string
    category: string
    description: string
    isPublic: Boolean
    email: string

    creatorId: string
}

const schema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, required: true},
    type: {type: String, required: true},
    position: {type: String, required: true},
    location: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    email: {type: String, required: true},

    creatorId: {type: String, required: true}
});

schema.statics.create = function (data: _Resume, callback: (e: Event) => void) {
    const Resume = this;
    async.waterfall([
        function (callback: (resume?: any) => void) {
            const resume = new Resume(data);
            resume.save(function (err: Error) {
                if (err) return callback(err);
                callback(resume)
            })
        }
    ], callback);
};

schema.statics.getOne = function (_id: string, callback: (e: Event) => void) {
    const Resume = this;
    async.waterfall([
        function (callback: (vacancy?: any) => void) {
            Resume.findOne({_id: _id}, (err: Error, result: _Resume[]) => {
                callback(result)
            })
        }
    ], callback);
};


schema.statics.getAllForPublic = function (callback: (e: Event) => void) {
    const Resume = this;
    async.waterfall([
        function (callback: (resume?: any) => void) {
            Resume.find({isPublic: true}, (err: Error, result: _Resume[]) => {
                callback(result)
            })
        }
    ], callback);
};

schema.statics.UpdateOne = function (resume: _Resume, callback: (e: Event) => void) {
    const Resume = this;
    async.waterfall([
        function (callback: (resume?: any) => void) {
            Resume.updateOne({_id: resume._id}, resume, (err: Error) => {
                callback(resume)
            })
        }
    ], callback);
};

schema.statics.delete = function (_id: number, callback: (e: Event) => void) {
    const Resume = this;
    async.waterfall([
        function (callback: (e: Event) => void) {
            Resume.findOne({_id: _id}, callback);
        },
        function (resume: any, callback: (e: Event | null, isDelete?: Boolean) => void) {
            if (resume) {
                resume.remove();
                callback(null, true)
            }
            else
                callback(new resumeError("Резюме не найдено"));
        }
    ], callback);
};

export const Resume = mongoose.model('Resume', schema);

interface resumeError extends Event {
    message: string
}

const resumeError = function (this: resumeError, message: string) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, resumeError);
    this.message = message
} as  any as{ new (message: string): resumeError; };

util.inherits(resumeError, Error);
resumeError.prototype.name = 'resumeError';


module.exports = {resumeError, Resume};

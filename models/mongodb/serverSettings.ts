const async = require('async');
const mongoose = require('../../lib/mongoose'),
    Schema = mongoose.Schema;

export interface _ServerSettings {
    myId: number
    vacancy: { days: number, count: number }
    resume: { days: number, count: number }
}

const schema = new Schema({
    myId: {type: Number, required:true, unique:true},
    vacancy: {type: Object, required:true},
    resume: {type: Object, required:true}
});

schema.statics.create = function (data: _ServerSettings, callback: (e: Event) => void) {
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

schema.statics.getOne = function (callback: (e: Event) => void) {
    const ServerSettings = this;
    async.waterfall([
        function (callback: (vacancy?: any) => void) {
            ServerSettings.findOne({myId: 0}, (err: Error, result: _ServerSettings) => {
                callback(result)
            })
        }
    ], callback);
};

schema.statics.UpdateOne = function (sett: _ServerSettings, callback: (e: Event) => void) {
    const ServerSettings = this;
    async.waterfall([
        function (callback: (sett?: any) => void) {
            ServerSettings.updateOne({myId: 0}, sett, (err: Error) => {
                callback(sett)
            })
        }
    ], callback);
};

export const ServerSettings = mongoose.model('ServerSettings', schema);

module.exports = {ServerSettings};

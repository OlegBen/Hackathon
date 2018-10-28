namespace mongoose {
    const mongoose = require('mongoose');
    const config = require('../config/config.json');
    mongoose.connect(config.mongodb.db.uri, config.mongoose.options);
    module.exports = mongoose;
}
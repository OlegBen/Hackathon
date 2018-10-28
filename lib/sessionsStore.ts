namespace session {
    const mongoose = require('../lib/mongoose');
    const config = require('../config/config.json');

    const session = require('express-session');
    const MongoStore = require('connect-mongo')(session);
    const connection = mongoose.createConnection(config.mongodb.db.uri);

    const sessionStore = new MongoStore({mongooseConnection: connection});

    const sessionOptions = session({
        secret: config.session.secret,
        key: config.session.key,
        cookie: config.session.cookie,
        store: sessionStore
    });

    module.exports = {sessionOptions, sessionStore};

}
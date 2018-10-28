const express = require('express'),
    app = express(),
    path = require('path'),
    config = require('./config/config.json'),
    PORT = process.env.PORT || config.port,
    bodyParser = require('body-parser'),
    {notFoundPage, serverError} = require('./error/errors');

app.use(require('./middleware/infoProject'))
    .use(express.static(path.join(__dirname, 'public')))
    .use(express.static(path.join(__dirname, 'bower_components')))
    .engine('ejs', require('ejs-locals'))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .use(require('serve-favicon')(path.join(__dirname, 'public', 'favicon.ico')))
    .use(require('morgan')('dev'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(require('cookie-parser')())
    .use(require('./lib/sessionsStore').sessionOptions)
    .use(require('./middleware/sendHttpError'))
    .use(require('./middleware/loadUser'))
    .use(require('./middleware/minifiHtml'))
    .use('/', require('./middleware/visits').Counter, require('./routes/index'))
    .use(notFoundPage)
    .use(serverError);

const server = require('http').createServer(app);
server.listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
const io = require('./socket/index')(server);
app.set('io', io);

module.exports = app;
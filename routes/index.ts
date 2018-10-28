import express = require('express')

const router = express.Router();

const {checkAuth} = require('../middleware/checkAuth');

router.post('/register', require('./authorize/register').post);
router.post('/login', require('./authorize/login').post);
router.post('/logout', require('./authorize/logout').post);

router.get('/', require('./pages/frontPage').get);
router.get('/login', require('./authorize/login').get);
router.get('/register', require('./authorize/register').get);
router.get('/status', require('./pages/status').get);

module.exports = router;

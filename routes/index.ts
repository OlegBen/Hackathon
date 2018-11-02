import express = require('express')

const router = express.Router();

const {checkAuth} = require('../middleware/checkAuth');


router.get('/', require('./pages/frontPage').get);
router.get('/status', require('./pages/status').get);

router.get('/login', require('./pages/authorize/login').get);
router.post('/login', require('./pages/authorize/login').post);
router.get('/register', require('./pages/authorize/register').get);
router.post('/register', require('./pages/authorize/register').post);
router.post('/logout', require('./pages/authorize/logout').post);


router.get('/list_vacancy', require('./pages/listVacancy').get);
router.get('/user_page', checkAuth, require('./pages/user/userPage').get);
router.get('/create_vacancy', checkAuth, require('./pages/user/createVacancy').get);
router.post('/create_vacancy', checkAuth, require('./pages/user/createVacancy').post);

router.get('/api/vacancy', checkAuth, require('./api/vacancy').get);



module.exports = router;

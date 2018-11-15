import express = require('express')


const router = express.Router();
const {checkAuth} = require('../middleware/checkAuth');
const checkPermissions = require('../middleware/checkApiPerm');
const {generateData} = require('./generateData');

router.get('/generate',  generateData);


router.get('/', require('./pages/frontPage').get);
router.get('/admin_panel', checkAuth, require('./pages/adminPanel').get);

router.get('/login', require('./pages/authorize/login').get);
router.get('/register', require('./pages/authorize/register').get);

router.get('/list_vacancy', require('./pages/all/listVacancy').get);                                /* Список вакансий */
router.get('/list_vacancy/:id', require('./pages/all/vacancyItem').get);                            /* Вакансия */
router.get('/create_vacancy',  require('./pages/user/createVacancy').get);                /* Создание вакансии */

router.get('/list_resume',  require('./pages/all/listResume').get);                                 /* Список резюме */
router.get('/list_resume/:id',  require('./pages/all/resumeItem').get);                             /* Резюме */
router.get('/create_resume', checkAuth, require('./pages/user/createResume').get);                  /* Создание резюме */

router.get('/user_page', checkAuth, require('./pages/user/userPage').get);                          /* Страница пользователя */
router.get('/history_search', checkAuth, require('./pages/user/historySearch').get);                /* История просмотров */


/* Сбор данных */
router.get('/api/user_vacancy', checkPermissions, checkAuth, require('./api/userVacancy').get);
router.get('/api/all_vacancy', checkPermissions, require('./api/allVacancy').get);
router.get('/api/all_resume', checkPermissions, require('./api/allResume').get);
router.get('/api/get_location', checkPermissions, require('./api/allLocations').get);
router.get('/api/get_category', checkPermissions, require('./api/allCategotys').get);


router.post('/admin_panel', checkAuth, require('./pages/adminPanel').post);
router.post('/post_vacancy', checkAuth, require('./pages/user/createVacancy').post);
router.post('/post_resume', checkAuth, require('./pages/user/createResume').post);
router.post('/login', require('./pages/authorize/login').post);
router.post('/register', require('./pages/authorize/register').post);
router.post('/logout', require('./pages/authorize/logout').post);



module.exports = router;
const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_Controller');

console.log('router loaded');

router.get('/', homeController.home);

// whenever any request comes with users, it requires/goes-to users routes
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));


router.use('/api', require('./api'));



module.exports = router;
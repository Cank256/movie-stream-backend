const express = require('express');
const router = express();

const auth = require('./auth');
// const user = require('./user');
// const admin = require('./admin');

router.use('/auth', auth);
// router.use('/user', user;
// router.use('/admin', admin);

module.exports = router;
'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/restaurant', require('./restaurant'));
router.use('/reservation', require('./reservation'));
router.use('/table', require('./table'));
router.use('/shift', require('./shift'));
// router.use('/reservation', require('./reservation'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});

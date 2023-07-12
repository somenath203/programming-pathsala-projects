const router = require('express').Router();

const { tipCalculatorController } = require('../controllers/tipCalculatorController');


router.post('/calculate-tip', tipCalculatorController);


module.exports = router;
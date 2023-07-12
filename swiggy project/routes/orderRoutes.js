const router = require('express').Router();

const { takeOrder } = require('./../controllers/orderController');
const { auth } = require('./../middlewares/auth');


router.post('/take-order', auth, takeOrder);


module.exports = router;
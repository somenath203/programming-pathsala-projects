const router = require('express').Router();


const { registerUser, loginUser, forgetPassword, getAllOrdersGivenByUser } = require('../controllers/userControllers');
const { auth } = require('./../middlewares/auth');


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/forget-password', forgetPassword);

router.get('/get-all-orders-of-the-auth-user', auth, getAllOrdersGivenByUser);


module.exports = router;
const router = require('express').Router();

const { addRestuarantAndMenu, dispAllRestuarants, getRestuarantById } = require('./../controllers/restuarantController');
const { auth } = require('./../middlewares/auth');
const { isAdmin } = require('./../middlewares/isAdmin');


router.get('/disp-all-restuarants', dispAllRestuarants);

router.get('/get-particular-restuarant/:restuarantId', getRestuarantById)

router.post('/add-restuarant-and-menu', auth, isAdmin, addRestuarantAndMenu);


module.exports = router;
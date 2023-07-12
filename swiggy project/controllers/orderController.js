const User = require('./../models/userModel');
const Restuarant = require('./../models/restuarantModel');
const Order = require('./../models/orderModel');


const takeOrder = async (req, res) => {

    try {

        const { restuarantName, menuSelectedByUser } = req.body;


        const user = await User.findOne({ _id: req.body.authUserId });


        const restuarantSelectedByUser = await Restuarant.findOne({ restuarantName: restuarantName });

        if(!restuarantSelectedByUser) {
            return res.status(404).send({
                success: false,
                message: 'Entered Restuarant does not exist. Please try different restuarant'
            });
        };


        const menuListOfTheRestuarant = restuarantSelectedByUser.restuarantMenu;
        
        const isAllItemsSelectedByUserPresentedInMenu = menuSelectedByUser.every((menu) => menuListOfTheRestuarant.includes(menu));

        if(!isAllItemsSelectedByUserPresentedInMenu) {
            return res.status(404).send({
                success: false,
                message: 'One or multiple items selected by you does not exist in the menu card of the restuarant'
            });
        };

        const createOrder = await Order.create({
            nameOfTheRestuarantFromWhereOrderIsGiven: restuarantName,
            orders: menuSelectedByUser,
            idOfTheUserGivingTheOrder: user._id
        });

        res.status(200).send({
            success: true,
            message: `Your order is created successfully and your order-ID is ${createOrder._id}. You will receive your order soon in the address: '${user.address}'. Stay tuned.`
        });
        
    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });

    };

};


module.exports = {
    takeOrder
}
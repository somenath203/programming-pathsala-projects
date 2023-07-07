const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');


const isAdmin = async (req, res, next) => {

    try {
       
        const tokenFromHeader = req.headers.authorization.split(' ')[1];

        const tokenDecoded = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);

        const decodedTokenId = tokenDecoded.userId;

        const user = await User.findOne({ _id: decodedTokenId });

        if(!user.isAdmin) {
            return res.status(200).send({
                success: false,
                message: 'you are not authorized to access the route since you are not the admin'
            })
        };

        next();


    } catch (error) {
        
        console.log(error.message);

    };

};


module.exports = {
    isAdmin
}
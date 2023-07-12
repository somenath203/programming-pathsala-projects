const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
    
    try {
        
        const tokenFromHeader = req.headers.authorization.split(' ')[1];

        const tokenDecoded = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);

        req.body.authUserId = tokenDecoded.userId;

        next();

    } catch (error) {

        console.log(error);
        
        res.status(400).send({
            success: false,
            message: 'You are not authorized to access this route. Please authenticate yourself by logging in in order to access the route.'
        });

    }

};


module.exports = {
    auth
};
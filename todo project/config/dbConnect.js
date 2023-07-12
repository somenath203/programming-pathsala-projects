const mongoose = require('mongoose');


const dbConnect = async () => {
    try {
        
        const conn = await mongoose.connect(process.env.MONGO_URI);

        if(conn) {
            console.log('connection to mongoDB successful');
        }

    } catch (error) {
        
        console.log(error);

    }

};


module.exports = { dbConnect };
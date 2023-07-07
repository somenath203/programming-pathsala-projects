require('dotenv').config();
const express = require('express');

const { dbConnect } = require('./config/dbConnect');

const userRoutes = require('./routes/userRoutes');
const restuarantRoutes = require('./routes/restuarantRoutes');
const orderRoutes = require('./routes/orderRoutes');


dbConnect();


const app = express();


app.use(express.json());

app.use(userRoutes);
app.use(restuarantRoutes);
app.use(orderRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});
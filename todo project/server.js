require('dotenv').config();
const express = require('express');

const { dbConnect } = require('./config/dbConnect');
const todoRoutes = require('./routes/todoRoutes');

dbConnect();


const app = express();

app.use(express.json());

app.use(todoRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});
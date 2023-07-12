const express = require('express');

const tipCalculatorRouter = require('./routes/tipCalculatorRoute');

const app = express();


app.use(express.json());

app.use(tipCalculatorRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
})
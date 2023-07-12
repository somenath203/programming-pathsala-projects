const tipCalculatorController = async (req, res) => {

    try {

        const billAmount = Number(req.body.billAmount);
        const serviceQuality = req.body.serviceQuality;
        const noOfPeople = Number(req.body.noOfPeople);


        if (!(billAmount && serviceQuality && noOfPeople)) {
            return res.status(500).send({
                success: false,
                message: 'please enter all the input fields',
                data: null
            })
        };

        let serviceQualityNumber = 0;

        if(serviceQuality.toLowerCase() === 'outstanding') {
            serviceQualityNumber = 0.3;
        } else if (serviceQuality.toLowerCase() === 'good') {
            serviceQualityNumber = 0.2;
        } else if (serviceQuality.toLowerCase() === 'bad') {
            serviceQualityNumber = 0.1;
        } else {
            return res.status(500).send({
                success: false,
                message: "service quality can only either be 'outstanding', 'good' or 'bad'",
                data: null
            });
        }


        const tip = (billAmount * serviceQualityNumber) / noOfPeople;

        res.status(200).send({
            success: true,
            message: 'bill has been calculated successfully',
            data: {
                noOfPeople: `${noOfPeople}`,
                serviceQuality: serviceQuality.toLowerCase(),
                tip: `Rs.${tip}`
            }
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
    tipCalculatorController
};
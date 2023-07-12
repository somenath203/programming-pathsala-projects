const Restuarant = require('./../models/restuarantModel');


const dispAllRestuarants = async (req, res) => {

    try {
        
        const allRestuarants = await Restuarant.find({});

        res.status(200).send({
            success: true,
            message: 'all restuarants fetched successfully',
            totalNumberOfRestuarants: allRestuarants.length,
            restuarantList: allRestuarants
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });

    }
};

const getRestuarantById = async (req, res) => {

    try {
        
        const { restuarantId } = req.params;

        const getParticularRestuarant = await Restuarant.findById(restuarantId);

        if(!getParticularRestuarant) {
            return res.status(400).send({
                success: false,
                message: `restuarant with ID: ${restuarantId} does not exist`,
            });
        };

        res.status(200).send({
            success: true,
            message: `restuarant with ID: ${restuarantId} has been fetched successfully`,
            restuarant: getParticularRestuarant
        });

    } catch (error) {
        
        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });

    }
}

const addRestuarantAndMenu = async (req, res) => {

    try {

        const { restuarantName, restuarantAddress, restuarantMenu } = req.body;

        if (await Restuarant.findOne({ restuarantName: restuarantName })) {
            return res.status(400).send({
                success: false,
                message: 'restuarant with this name already exists',
                data: null
            })
        }

        const createRestuarantAndMenu = await Restuarant.create({
            restuarantName: restuarantName,
            restuarantAddress: restuarantAddress,
            restuarantMenu: restuarantMenu
        });

        res.status(201).send({
            success: true,
            message: 'restuarant has been created successfully',
            data: createRestuarantAndMenu
        })

    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,
            data: null
        });

    };

};


module.exports = {
    addRestuarantAndMenu,
    dispAllRestuarants,
    getRestuarantById
}
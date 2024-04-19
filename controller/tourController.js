

const Tour = require('../models/tourModel');


exports.getAllTours = async (req, res) => {
    try {

       //BUILD QUERY
        const queryObj = { ...req.query };
        const excludedFields = ['page','sort','limit','fields']
        excludedFields.forEach(el => delete queryObj[el])
        console.log(req.query , queryObj);

        const query = await Tour.find( queryObj);

        //CONST EXECUTE QUERY
        const tours = await query ;

        //SEND RESPONSE
        res.status(200).json({
            status: 'succes',
            message: 'all tours',
            results: tours.length,
            data: {
                tours: tours
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })


    }
}

// requete pour avoir un utilisateur 
exports.getTour = async (req, res) => {
    try {

        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'succes',
            message: 'good id',

            data: {
                tour
            }
        });

    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

exports.updateTour = async (req, res) => {
    try {

        const updt = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({

            status: 'success',
            data: {
                updt
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })

    }

}

exports.createTour = async (req, res) => {
    try {

        const newTour = await Tour.create(req.body)

        res.status(201).json({
            message: 'tours crée',
            status: 'succes',
            data: {
                tour: newTour
            }

        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }


}

exports.deleteTour = async (req, res) => {
    try {

        const deleteT = await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            message: 'delete tour',
            data: {
                delete: deleteT
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,

        })
    }


}
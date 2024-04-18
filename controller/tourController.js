

const Tour = require('../models/tourModel')







exports.getAllTours = async (req, res) => {
    try{

        const tours = await Tour.find();
        
        res.status(200).json({
            status:'succes',
            message:'all tours',
            results:tours.length,
            data:{
                tours: tours
            }
        })
    } catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })


    }
}

// requete pour avoir un utilisateur 
exports.getTour = async (req, res) => {
    try{

        const tour = await Tour.findById(req.params.id);
        
        res.status(200).json({
            status:'succes',
            message:'good id',
            
            data:{
                 tour
            }
        });
        
    }catch(err){
        res.status(404).json({
            status:'fail',
            message:err
        })
    }

} 

exports.updateTour = (req, res) => {
    console.log(req.body)

    res.status(200).json({

        status: 'success',
        data: {
            tour: '<update tour..>'
        }
    });

}

exports.createTour = async (req, res) => {
    try {

        // const newTour = new Tour({ })
        // newTour.save();

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
            status:"fail",
            message:err
        })
    }






}

exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        message: 'delete tour',
        data: null
    })

}
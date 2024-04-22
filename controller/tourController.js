

const Tour = require('../models/tourModel');


exports.getAllTours = async (req, res) => {
    try {

        //BUILD QUERY
        // 1A) filtering Filtrage des champs indésirables dans l'objet de requête
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields']
        excludedFields.forEach(el => delete queryObj[el])
        console.log(req.query, queryObj);

        // 1B) advanced query Requête avancée avec opérateurs de comparaison ($gte, $gt, $lte, $lt)
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));

        // {difficulty : 'easy', duration : {gte : 5}}
        let query = Tour.find(JSON.parse(queryStr));


        // 2) SORTING  TRI
        // Si la requête contient une directive de tri
        if (req.query.sort) {

            const sortBy = req.query.sort.split(',').join(' ');
            // Séparation des champs de tri par une virgule et les convertir en chaîne pour la fonction de tri
            console.log(sortBy);
            // Appliquer le tri à la requête
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt')
        

        // sort('price ratingAverage');
    }

    //3) field limiting
        
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else{
        query = query.select('-__v')
    }
        //CONST EXECUTE QUERY
        const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
        status: 'succes',
        message: 'all tours',
        results: tours.length,
        data: {
            tours: tours
        }
    });

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
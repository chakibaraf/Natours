const fs = require('fs')


const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


exports.checkBody = (req, res, next) => {
    console.log(req.body)
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: "no name and no price",
        })
    }
    next();
}


// Middlewear de verification id
exports.checkId = (req, res, next, val) => {
    console.log(`tour id is : ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id ,impossible update',
        });
    }
    next();

}


exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'succes',
        message: "all tours",
        results: tours.length,
        request: req.requesTime,
        data: {
            tours
        }
    })
}

// requete pour avoir un utilisateur 
exports.getTour = (req, res) => {


    // convert character en nombre 
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id);



    res.status(200).json({
        status: 'success',

        data: {
            tour
        }
    })

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

exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body)
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            message: 'tours crée',
            status: 'succes',
            tour: newTour

        })
    })





}

exports.deleteTour = (req, res) => {

    res.status(204).json({
        status: 'success',
        message: 'delete tour',
        data: null
    })

}
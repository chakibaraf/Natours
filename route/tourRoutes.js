const express = require("express");
const fs = require('fs');


const router = express.Router();

// permet d'avoir acces et lire le file 
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))




const getAllTours = (req, res) => {
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
const getTour = (req, res) => {


    // convert character en nombre 
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'tour dont exist , invalid id  '
        })
    }

    res.status(200).json({
        status: 'success',

        data: {
            tour
        }
    })

}

const updateTour = (req, res) => {
    console.log(req.body)
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid id ,impossible update',
        });
    }
    res.status(200).json({

        status: 'success',
        data: {
            tour: '<update tour..>'
        }
    });

}

const createTour = (req, res) => {
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

const deleteTour = (req, res) => {
    if (req.params.id > tours.length) {
        res.status(404).json({
            status: 'fail',
            message: 'invalid id cant delete'
        })

    }
    res.status(204).json({
        status: 'success',
        message: 'delete tour',
        data: null
    })

}

router
    .route('/')
    .get(getAllTours)
    .post(createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);





module.exports = router;
const express = require('express');
const fs = require('fs');

const router = express.Router();

// permet d'avoir acces et lire le file 
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))




const getAllUsers = (req, res) => {

    res.status(500).json({
        status: 'error',
        message: 'not yet',
        data: null

    })

}

const creatUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'not yet',
        data: null
    })

}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'not yet',
        data: null
    })
}

const uptdateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'not yet',
        data: null
    })

}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'not yet',
        data: null
    })

}

router
    .route('/')
    .get(getAllUsers)
    .post(creatUser);

router
    .route('/:id')
    .get(getUser)
    .patch(uptdateUser)
    .delete(deleteUser);



module.exports = router;
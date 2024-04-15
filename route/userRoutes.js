const express = require('express');
const userController = require('../controller/userController')

const router = express.Router();

// permet d'avoir acces et lire le file 

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.creatUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.uptdateUser)
    .delete(userController.deleteUser);



module.exports = router;
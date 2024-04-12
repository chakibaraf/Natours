
const express = require('express');
const fs = require('fs')
const app = express();


// middlewear pour permettre d'utiliser les json
app.use(express.json());

// app.get('/', (req, res) => {
//     res.status(200)
//         .json({ message: ('hello from the server'), app: 'Natours' })
// })

// app.post('/',(req,res)=>{
//     res.status(200)
//         .send("you can post to this url");
// })

// permet d'avoir acces et lire le file 
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

    // requete pour avoir tous les users 
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

// requete pour avoir un utilisateur 
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params)

    // convert character en nombre 
    const id = req.params.id * 1
    const tour = tours.find(el => el.id === id);

     if (!tour){
       return res.status(404).json({
        status :'fail',
        message :'tour dont exist , invalid id  '
       })
     }

    res.status(200).json({
        status: 'success',
        
        data: {
            tour
        }
    })
})

// permet de post dans le file tours-simple
app.post('/api/v1/tours', (req, res) => {

    // console.log(req.body)

    // permet de rajouter un id+1
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




})

// j'ecoute sur le port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`app running ${port}...`)
});
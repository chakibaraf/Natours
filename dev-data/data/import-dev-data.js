const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require("../../models/tourModel");




dotenv.config({ path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',
    process.env.DATABASE_PASSWORD);

// const DB_LOCAL = process.env.DATABASE_LOCAL.

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log('db connection success'));

//READ JSON FILE.

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA INTO DB.

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log(('data successfully loaded'))
        process.exit();
    } catch (err) {
        console.log(err);

    }
}

// DELETE ALL DATA FROM COLLECTION.
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('data successfuly deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}
if(process.argv[2] === '--import'){
    importData()
}else if (process.argv[2]=== '--delete'){
deleteData();
};

console.log(process.argv);
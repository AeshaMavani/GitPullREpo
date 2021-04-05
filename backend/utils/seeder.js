const Service = require('../models/service');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const services = require('../data/services');

// Setting dotenv file
dotenv.config({path:'backend/config/config.env'})
connectDatabase();

const seedServices = async () => {
    try{
        await Service.deleteMany();
        console.log('Services are deleted.');

        await Service.insertMany(services);
        console.log('All Services are added.');

        process.exit();
        
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedServices();
/**
 *  Load Required Dependencies 
 */
require('dotenv').config();
const mongoose = require('mongoose');

/**
 *  Global configuration 
 */
const mongoURL = process.env.DATABASE_URL;
const db = mongoose.connection;

/**
 *  Connect to MongoDB
 */
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}, () => {
    console.log('Connection with MongoDB is established');
})

db.on('error', (error) => {
    console.log(error);
    console.log(error.message + ' is MongoDB not running?');
})

db.on('connected', () => {
    console.log('Connected to', mongoURL);
})

db.on('disconnected', () => {
    console.log('Disconnected!');
})

module.exports = mongoose;


const mongoose = require('mongoose');
const dbConnect = async() => {
    try {
        mongoose.connection.on('connected', () => console.log('connected db!'));
        mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log('Connection error: ' + error);
        throw new Error(error);
    }
}

module.exports = dbConnect;
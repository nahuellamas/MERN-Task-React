const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: false,
        });
        console.log('DB is connected');
    } catch (error){
        console.log(error);
        process.exit(1);//detiene la app
    }
};

module.exports = conectDB;
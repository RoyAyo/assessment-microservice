const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI =  process.env.MONGO_URI;
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(MONGO_URI,{useUnifiedTopology:true, useNewUrlParser:true}).then(() => {
    console.log('connected to the database successfuly');
}).catch(e => {
    console.log(e);
});
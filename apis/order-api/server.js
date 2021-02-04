const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();

require('./utils/Database');
// require('./utils/Kafka');

const PORT = process.env.PORT || 8080;

//app setup
app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});


module.exports.app = app;
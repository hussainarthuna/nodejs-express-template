const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

app.use(helmet());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
    console.log('CONNECTED');
    app.listen(process.env.PORT);
    // app.listen(3000);
}).catch(err => {
    console.log(err);
});

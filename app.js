const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const adminRoutes = require('./routes/admin-api/adminRoutes');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

app.use(helmet());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(cors());

app.use('/admin', adminRoutes);

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }).then(() => {
    console.log('CONNECTED');
    app.listen(process.env.PORT);
}).catch(err => {
    console.log(err);
});

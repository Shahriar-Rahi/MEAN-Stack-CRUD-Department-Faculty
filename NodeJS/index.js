const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const { mongoose } = require('./db.js');
var departmentController = require('./controllers/departmentController.js');
var facultyController = require('./controllers/facultyController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public/index.html'))
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Server started at port...'));

app.use('/departments', departmentController);
app.use('/faculties', facultyController);
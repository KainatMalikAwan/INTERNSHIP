const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schoolController = require('./controller/schoolController');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://kainatmalik38201:o1d86Tu67NgaRwAl@cluster0.d8ighat.mongodb.net/schoolDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

// Define API routes
app.post('/api/schools', schoolController.createSchool);
app.put('/api/schools/:id', schoolController.updateSchool);
app.get('/api/schools/:id', schoolController.getSchoolById);
app.get('/api/schools', schoolController.getAllSchools);
app.delete('/api/schools/:id', schoolController.deleteSchool);

// Start the server
app.listen(port, () =>
{
     console.log(`Server is running on port ${port}`);
});

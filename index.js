const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');
const userManagment = require('./routes/userManagment');
const userFilmManagement = require('./routes/userFilmManagment');
const mongoose = require('mongoose');
const cors = require('cors');

//Connect to mongoDB, if dosen't exist it will create it
// mongoose.connect('mongodb://localhost/mymovies');
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Data base is connected');
  })
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });
//Overwhrite because Mongo Promise is deprecated
mongoose.Promise = global.Promise;

//static files
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use(userManagment);
app.use(userFilmManagement);

//Error handling
app.use((err, req, res, next) => {
  // res.status(422).send({ error: err.message });
  console.log('error:' + err.message);
  res.send({ error: err.message });
});

//Listen environment port or to port ....
const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

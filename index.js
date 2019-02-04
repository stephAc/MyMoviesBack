const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userManagment = require('./routes/userManagment');
const mongoose = require('mongoose');
const cors = require('cors');

//Connect to mongoDB, if dosen't exist it will create it
// mongoose.connect('mongodb://localhost/mymovies');
mongoose.connect('mongodb://:@ds241664.mlab.com:41664/mymoviesreact', {
  useNewUrlParser: true,
});
//Overwhrite because Mongo Promise is deprecated
mongoose.Promise = global.Promise;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use(userManagment);

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

/* exemple
app.get('/', (req, res) => {
  console.log('get');
  res.end();  End the request
  res.send({ name: 'Yoshi' }); //Send data
});
*/

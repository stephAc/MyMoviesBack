const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/userinfo/:id', (req, res, next) => {
  console.log(req.params.id);
  User.findOne({ _id: req.params.id }).then(user => {
    console.log([user.name, user.email]);
    res.json([user.name, user.email]);
  });
});

router.post('/login', (req, res, next) => {
  User.find({ name: req.body.logName, pwd: req.body.logPwd }).then(result => {
    if (result.length) {
      console.log('trouve');
      console.log([result[0].name, result[0]._id]);
      res.json([result[0].name, result[0]._id]);
    } else {
      console.log('rien');
    }
  });
});

//Add new member
router.post('/mymovies/inscription', (req, res, next) => {
  // var user = new User(req.body);
  // user.save();
  //Is Like
  User.create(req.body)
    .then(user => {
      console.log(user);
      res.send();
    })
    .catch(next);
});

router.post('/confirmuser', (req, res, next) => {
  console.log(req.body.id + ' ' + req.body.mdp);
  User.find({ _id: req.body.id, pwd: req.body.mdp }).then(user => {
    if (user.length) {
      console.log('trouve');
      res.json(1);
    } else {
      console.log('rien');
    }
  });
});

router.put('/updateuser/:id', (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.send(user);
    });
  });
});

router.delete('/deleteuser/:id', (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }).then(user => {
    res.send();
  });
});

module.exports = router;

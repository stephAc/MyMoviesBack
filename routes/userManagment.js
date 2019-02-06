const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', (req, res, next) => {
  User.find({ name: req.body.logName, pwd: req.body.logPwd }).then(result => {
    if (result.length) {
      console.log('trouve');
      res.json(result[0]);
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

router.put('/updateuser/:id', (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    User.findOne({ _id: req.params.id }).then(user => {
      res.send(user);
    });
  });
});

router.delete('/deleteuser/:id', (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id }).then(user => {
    res.send(user);
  });
});

module.exports = router;

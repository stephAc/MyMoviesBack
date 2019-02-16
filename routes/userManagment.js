const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/userinfo/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(user => {
    console.log([user.name, user.email]);
    res.json([user.name, user.email]);
  });
});

router.post('/login', (req, res, next) => {
  User.findOne({ name: req.body.logName }).then(user => {
    bcrypt.compare(req.body.logPwd, user.pwd).then(result => {
      if (result) {
        console.log('trouve');
        res.json([user.name, user._id]);
      } else {
        console.log('rien');
      }
    });
  });
});

router.post('/autoconnexion', (req, res, next) => {
  console.log('name: req.body.name' + req.body.pwd);
  User.findOne({ name: req.body.name }).then(user => {
    bcrypt.compare(req.body.pwd, user.pwd).then(result => {
      if (result) {
        console.log('trouve');
        res.json([user.name, user._id]);
      } else {
        console.log('rien');
      }
    });
  });
});

//Add new member
router.post('/mymovies/inscription', (req, res, next) => {
  bcrypt
    .hash(req.body.pwd, saltRounds, (err, hash) => {
      User.create({
        name: req.body.name,
        email: req.body.email,
        pwd: hash,
      })
        .then(user => {
          res.send([user.name, user._id]);
        })
        .catch(next);
    })
    .catch(err);
});

router.post('/confirmuser', (req, res, next) => {
  User.findOne({ _id: req.body.id }).then(user => {
    bcrypt.compare(req.body.mdp, user.pwd).then(result => {
      if (result) {
        console.log('trouve');
        res.json(1);
      } else {
        console.log('rien');
      }
    });
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

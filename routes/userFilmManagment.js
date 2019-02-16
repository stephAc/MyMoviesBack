const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/towatchuserfilm/:id', (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(user => {
    console.log(user.towatch);
    res.send(JSON.stringify(user.towatch));
  });
});

router.put('/addfilm', (req, res, next) => {
  console.log(req.body);
  User.findOneAndUpdate(
    { _id: req.body.idUser },
    { $push: { towatch: req.body.idFilm } },
  ).then(user => {
    console.log('old ' + user);
    User.findOne({ _id: req.body.idUser }).then(user => {
      console.log(user.towatch);
    });
  });
});

module.exports = router;

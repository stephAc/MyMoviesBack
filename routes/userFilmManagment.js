const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.put('/addfilm', (req, res, next) => {
  console.log(req.body);
  // User.findOneByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
  //   User.findOne({ _id: req.params.id }).then(user => {
  //     res.send(user);
  //   });
  // });
});

module.exports = router;

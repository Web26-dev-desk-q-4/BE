const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, checkRole('student'), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkRole(role){
  return function(req, res, next){
    if(req.token && role === req.token.role){
      next()
    }else{
      res.status(403).json({message: "No access for students"})
    }
  }
}
module.exports = router;

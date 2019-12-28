const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../01-auth/restricted-middleware.js');

router.get('/', restricted,  (req, res) => { //REMOVED checkRole('student'),
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkRole(role){ //don't think we need to restruct any users from seeing other users, removed as middleware from above GET
  return function(req, res, next){
    if(req.token && role === req.token.role){
      next()
    }else{
      res.status(403).json({message: "No access for students"})
    }
  }
}
module.exports = router;

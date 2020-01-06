const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../05-users/users-model.js');

const tokenHelper = require('./token-helper')

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({error: "Server side, could not add user, check req.body"})
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
//sign token
        const token = tokenHelper.signToken(user);
//send token

        res.status(200).json({
          token, //added token as part of response sent
          message: `Welcome ${user.username}!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Token/Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({error: "Server side, could not log in, check token/user existence"});
    });
});



module.exports = router;


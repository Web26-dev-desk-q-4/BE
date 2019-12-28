const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; //in insomnia don't put the token with quotes! (on the header)

  const secret = process.env.JWT_SECRET || 'is it secret, is it safe?'

if (authorization){
  jwt.verify(authorization, secret , function (err, decoded) {
    if(err){
      res.status(401).json({message: "invalid token"})

    }else{
      req.token = decoded; //this can be used to change the settings!!! set the application on the client, persist it on the server BASED ON THE this!!!! if you were using sessions you might save it on the user profile. you can also use it to save a (non-access) token for something else you want to persist even without logging in - like a form submission to capture the zipcode
      next();
    }
  }) 
}else{
  res.status(400).json({message: 'please login'})
}


  

};

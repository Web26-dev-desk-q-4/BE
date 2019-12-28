const jwt = require('jsonwebtoken')

module.exports = {
    signToken
}

function signToken(user){
    const payload = {
      username:user.username,
     // role: 'student' //this will come from the database
      id: user.id,
      student_id: user.student_id,
      helper_id: user.helper_id
    };
    
    const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';
    
    const options = {
      expiresIn: '1h',
    
    };
    
      return jwt.sign(payload, secret, options)
    };
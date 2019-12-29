

module.exports = {

    checkIfHelper,
    checkIfStudent

}

function checkIfStudent(req, res, next){ //don't think we need to restruct any users from seeing other users, removed as middleware from above GET

    if(req.token && req.token.student_id > 0){
      next()
    }else{
      res.status(403).json({message: "Access for students only"})
    }
  
}

function checkIfHelper(req, res, next){ //don't think we need to restruct any users from seeing other users, removed as middleware from above GET
 
    if(req.token && req.token.helper_id > 0){
      next()
    }else{
      res.status(403).json({message: "No access for helpers only"})
    }
  
};
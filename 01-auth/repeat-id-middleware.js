module.exports = {

    repeatSchoolId,
    repeatHelperId

}

function repeatSchoolId(req, res, next){

    if(req.token.student_id > 0){ //MAKE SURE TO UPDATETHE TOKEN IN INSOMNIA, this needs to be up to date every time they attempt this!!!!
        res.status(400).json({error: "student ID already exists"})
    }else{
        //console.log(req.token.student_id)
        next()
    }

}


function repeatHelperId(req, res, next){
    if(req.token.helper_id > 0){ //MAKE SURE TO UPDATETHE TOKEN IN INSOMNIA, this needs to be up to date every time they attempt this!!!!
        res.status(400).json({error: "helper ID already exists"})
    }else{
        //console.log(req.token.helper_id)
        next()
    }
}
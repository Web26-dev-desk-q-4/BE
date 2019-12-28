const router = require('express').Router();

const Users = require('../05-users/users-model');

const Students = require('./students-model')

//only logged in users can do this!
const restricted = require('../01-auth/restricted-middleware.js');

router.get('/', restricted,  (req, res) => { //REMOVED checkRole('student'),
  Students.find()
    .then(students => {
      res.json(students);
    })
    .catch(err => res.send(err));
});

router.post('/',  restricted, (req, res) => { //this should also be restricted by whether or not they have a student_id!!!!

    const userID = req.token.id;

    // console.log(userID)

    Students.add()
        .then(student => {
            let id = student.id;
            //update user db function here OR front end can do this POST and a user PUT, going with the former

            //console.log(id)
            // res.status(200).json(student)
            Users.edit(userID, student)
                .then(user => {
                    res.status(200).json(user)
                        // if(numberUpdated){
                        //     res.status(201).json({message: `Successfully added ${numberUpdated} student ID`})
                        // }
                })
                .catch(err => {
                    res.status(500).json({error: "Server side, could not change student ID for User, check req.body"});
                })
        })
        .catch(err => {
            res.status(500).json({error: "Server side, could not add student, check req.body"});
        })
})

module.exports = router;


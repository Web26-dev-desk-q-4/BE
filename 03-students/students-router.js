const router = require('express').Router();

const Users = require('../05-users/users-model');

const Students = require('./students-model')

//only logged in users can do this!
const restricted = require('../01-auth/restricted-middleware.js');

const repeatedID = require('../01-auth/repeat-id-middleware')

router.get('/', restricted,  (req, res) => { //REMOVED checkRole('student'),
  Students.find()
    .then(students => {
      res.json(students);
    })
    .catch(err => res.send(err));
});

router.post('/',  restricted, repeatedID.repeatSchoolId, (req, res) => { //this should also be restricted by whether or not they have a student_id!!!!

    const userID = req.token.id;

    Students.add()
        .then(student => {
            //update user db function here OR front end can do this POST and a user PUT, going with the former

            Users.edit(userID, student)
                .then(user => {
                    res.status(200).json(user)

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


const router = require('express').Router();

const Tickets = require('./tickets-model')


//only logged in users can do this!
const restricted = require('../01-auth/restricted-middleware.js');

const role = require('./ticket-restrictions')


//POST Ticket as Student X'd - requires everything BUT answer,open, or checked_out
router.post('/create/:id', restricted, role.checkIfStudent, (req,res) => { //requires student id!!!
    const studentID = req.token.student_id;
    const ticketBody = req.body
//console.log(ticketBody)
    Tickets.add(ticketBody, studentID)
        .then(ticket => {
            //console.log(ticket.id)
            res.status(201).json({message: `Ticket created: ${ticket.title}`})
        })
        .catch(err => {
            res.status(500).json({error: 'Server-side, failure at Ticket POST'})
        })
});




router.put('/edit/:id', restricted, role.checkIfHelper, (req, res) => { //id here should be ticket ID!!!!!!!!!!!!!!!!!!
    const newTicketBody = req.body;

    const ticketID = req.params.id;

    Tickets.editTicket(ticketID, newTicketBody)
        .then(processedTicket => {
            res.status(200).json({message: `processed ticket ${processedTicket.id}- ${processedTicket.title}`})
        })
        .catch(err => {
            res.status(500).json({error: 'Server-side, failure at Ticket PUT'})
        })
});


//Body should just include "checked_out" property X'd
//Simultaneously creates a helper_ticket
router.put('/checkout/:id', restricted, role.checkIfHelper, (req, res) => { //id here should be ticket ID!!!!!!!!!!!!!!!!!!
    const newTicketBody = req.body;

    const ticketID = req.params.id;

    const helperID = req.token.helper_id;

    Tickets.checkoutTicket(ticketID, newTicketBody, helperID)
        .then(processedTicket => {
            res.status(200).json({message: `checked out ticket ${processedTicket.id}`})
        })
        .catch(err => {
            res.status(500).json({error: 'Server-side, failure at Checkout PUT'})
        })
});


//GET ALL X'd
router.get('/helper', restricted, role.checkIfHelper, (req, res) => { //REMOVED checkRole('student'),

  Tickets.find()
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => res.status(500).json({error: 'Could not GET all tickets'}));
});



//GET Student's X'd
router.get('/:id', restricted, role.checkIfStudent, (req, res) => { 
 const id = req.token.student_id; //this id should be the student id since it can be different than the user id, can also use the student ID in the path above and use req.params.id here instead!!!!

Tickets.findBy(id)
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => res.status(500).json({error: 'Could not GET user\'s student tickets'}));
});


//GET Helper's X'd
router.get('/helper/:id', restricted, role.checkIfHelper, (req, res) => { 
    const id = req.token.helper_id; //this id should be the helper id since it can be different than the user id, can also use the helper ID in the path above and use req.params.id here instead!!!!
   
   Tickets.findByHelper(id)
       .then(tickets => {
         res.status(200).json(tickets);
       })
       .catch(err => res.status(500).json({error: 'Could not GET user\'s help tickets'}));
   });

module.exports = router;
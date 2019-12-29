const router = require('express').Router();

const Tickets = require('./tickets-model')


//only logged in users can do this!
const restricted = require('../01-auth/restricted-middleware.js');

const role = require('./ticket-restrictions')


//POST Ticket as Student X'd - requires everything BUT answer or open (on next latest migration)
router.post('/create', restricted, role.checkIfStudent, (req,res) => {

    const ticketBody = req.body
//console.log(ticketBody)
    Tickets.add(ticketBody)
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




//GET ALL X'd
router.get('/helper/:id', restricted, role.checkIfHelper, (req, res) => { //REMOVED checkRole('student'),

  Tickets.find()
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => res.status(500).json({error: 'Could not GET all tickets'}));
});



//GET Student's X'd
router.get('/:id', restricted, role.checkIfStudent, (req, res) => { //the :id should be the User's id!!!!!!!!!!!!!!!!!
 const id = req.params.id;

Tickets.findBy(id)
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => res.status(500).json({error: 'Could not GET users tickets'}));
});

module.exports = router;
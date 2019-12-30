const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  editTicket,
  checkoutTicket,
  findByHelper,
  removeTicket
};

function find() { //if helper
  return db('tickets').select('id', 'open', 'checked_out', 'category','title', 'description', 'what_was_tried', 'answer' );
}

function findBy(id) { //if student
  // return db('tickets').where(filter);
 console.log(id)
return db('student_tickets')
        .select('*')
        .join('tickets', 'student_tickets.ticket_id', 'tickets.id')
        .where('student_tickets.student_id', id)
 

        
}

function findByHelper(id) { //if helper INDIVIDUAL SPECIFIC
  // return db('tickets').where(filter);
 console.log(id)
return db('helper_tickets')
        .select('*')
        .join('tickets', 'helper_tickets.ticket_id', 'tickets.id')
        .where('helper_tickets.helper_id', id)
 

        
}

async function add(ticketBody, studentID) { //if student, should PUT the Students table as well
  const [id] = await db('tickets').insert(ticketBody, 'id');
  const studentTicket = await db('student_tickets')
                                .insert({
                                  student_id: studentID,
                                  ticket_id: id
                                })
//console.log(ticketBody)
  return findById(id);
}

function findById(id) { 
  return db('tickets')
    .where({ id })
    .first();
}

async function editTicket(ticketID, newTicketBody){
    await db('tickets')
            .where({id: ticketID}) 
            .update('answer', newTicketBody.answer)
            .update('open', newTicketBody.open)
  
            return findById(ticketID)
  
         
  
}

async function checkoutTicket(ticketID, newTicketBody, helperID){
  await db('tickets')
          .where({id: ticketID}) 
          .update('checked_out', newTicketBody.checked_out)

  await db('helper_tickets')
          .insert({
            helper_id: helperID,
            ticket_id: ticketID
          })

          return findById(ticketID)

       

}

async function removeTicket(ticketID){
      await db('helper_tickets')
            .where({ticket_id: ticketID})
            .del()

      await db('student_tickets')
            .where({ticket_id: ticketID})
            .del()

      return db('tickets')
              .where({id: ticketID})
              .del()
}
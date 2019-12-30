const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  editTicket
};

function find() { //if helper
  return db('tickets').select('id', 'open', 'category','title', 'description', 'what_was_tried', 'answer' );
}

function findBy(id) { //if student
  // return db('tickets').where(filter);
 console.log(id)
return db('student_tickets')
        .select('*')
        .join('tickets', 'student_tickets.ticket_id', 'tickets.id')
        .where('student_tickets.student_id', id)
 

        
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
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
 
return db('students')
        .select('*')
        .join('tickets', 'students.ticket_id', 'tickets.id')
        .where('students.id', id)
 

        
}

async function add(ticketBody) { //if student, should PUT the Students table as well
  const [id] = await db('tickets').insert(ticketBody, 'id');
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
const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  edit,
  editHelperId
};

function find() {
  return db('users').select('id', 'username', 'password', 'student_id', 'helper_id');
}

function findBy(filter) {
  return db('users').where(filter);
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function edit(userID, student){ //should I  async??
  await db('users')
          .where({id: userID}) 
          .update('student_id', student.id)
          
          return findById(userID)

       
}

async function editHelperId(userID, helper){ //should I  async??
  await db('users')
          .where({id: userID}) 
          .update('helper_id', helper.id)

          return findById(userID)

       
}
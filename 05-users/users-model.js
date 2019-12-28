const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  edit
};

function find() {
  return db('users').select('id', 'username', 'password', 'student_id');
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
          .where({id: userID}) //{id: id} you are trying to find the user by the new student ID!!!!
          .update('student_id', student.id)

          return findById(userID)

       
}
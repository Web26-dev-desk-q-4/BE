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

async function edit(filter){ //should I  async??
  const count = await db('users')
          .where(filter) //{id: id}
          .update('student_id', filter.id)

        return findById(filter)
}
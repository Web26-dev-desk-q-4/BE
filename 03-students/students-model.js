const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('students').select('id', 'ticket_id');
}

function findBy(filter) {
  return db('students').where(filter);
}

async function add() {
  const [id] = await db('students').insert({}, 'id');

  return findById(id);
}

function findById(id) {
  return db('students')
    .where({ id })
    .first();
}

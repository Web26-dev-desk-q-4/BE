const db = require('../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('helpers').select('id', 'ticket_id');
}

function findBy(filter) {
  return db('helpers').where(filter);
}

async function add() {
  const [id] = await db('helpers').insert({}, 'id');

  return findById(id);
}

function findById(id) {
  return db('helpers')
    .where({ id })
    .first();
}

exports.up = function(knex) {
  return knex.schema
  .createTable('tickets', tickets => {
    tickets.increments()

    tickets
       .boolean('open')
       .defaultTo(true)

    tickets
      .string('category', 255)
      .notNullable()

    tickets
      .string('title', 255)
      .notNullable()  

    tickets
      .string('description', 255)
      .notNullable()

    tickets
      .string('what_was_tried', 255)
      .notNullable()

    tickets
      .string('answer', 255)
      .notNullable()
})

  .createTable('students', students => {
    students.increments()
    students
       .integer(ticket_id)
       .unique()
       .references('id')
       .inTable('tickets')
       .onDelete('CASCADE') //restrict will make it so it doesn't delete the parent record too (tickets record), we want it to cascade
       .onUpdate('CASCADE')

})

.createTable('helpers', helpers => {
  helpers.increments()
  helpers
      .integer(ticket_id)
      .unique()
      .references('id')
      .inTable('tickets')
      .onDelete('RESTRICT') //this should be restrict because helpers shouldn't delete student made tickets
      .onUpdate('CASCADE')

})

  .createTable('users', users => {
          users.increments();

          users
            .string('username', 128)
            .notNullable()
            .unique();

          users
            .string('password', 128)
            .notNullable();

          users
            .integer('student_id')
            .unique()
            .references('id')
            .inTable('students')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

          users
            .integer('helper_id')
            .unique()
            .references('id')
            .inTable('helpers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')




        })

   
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTableIfExists('users')
  .dropTableIfExists('helpers')
  .dropTableIfExists('students')
  .dropTableIfExists('tickets');

};

exports.up = function(knex) {
  return knex.schema
  .createTable('tickets', tickets => {
    tickets.increments()

    tickets
       .boolean('open')
       .defaultTo(true)

    tickets
       .boolean('checked_out')
       .defaultTo(false)

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
      //.notNullable() //THIS SHOULD NOT BE NOT NULLABLE!!!
})

  .createTable('students', students => {
    students.increments()
    students
       .integer('ticket_id')
       .unsigned()
       .unique()
       .references('id')
       .inTable('tickets')
       .onDelete('CASCADE') //restrict will make it so it doesn't delete the parent record too (tickets record), we want it to cascade
       .onUpdate('CASCADE')

})

.createTable('helpers', helpers => {
  helpers.increments()
  helpers
      .integer('ticket_id')
      .unsigned()
      .unique()
      .references('id')
      .inTable('tickets')
      .onDelete('RESTRICT') //this should be restrict because helpers shouldn't delete student made tickets
      .onUpdate('CASCADE')

})

.createTable('helper_tickets', helper_tickets => {
  helper_tickets.increments()

  helper_tickets
  .integer('helper_id')
  .unsigned()
  .references('id')
  .inTable('helpers')
  .onDelete('RESTRICT') //this should be restrict because helpers shouldn't delete student made tickets
  .onUpdate('CASCADE')

  helper_tickets
      .integer('ticket_id')
      .unsigned()
      .unique()//tickets should be unique but not helper IDs
      .references('id')
      .inTable('tickets')
      .onDelete('RESTRICT') //this should be restrict because helpers shouldn't delete student made tickets
      .onUpdate('CASCADE')

})
.createTable('student_tickets', student_tickets => {
  student_tickets.increments()
  student_tickets
  .integer('student_id')
  .unsigned()
  .references('id')
  .inTable('students')
  .onDelete('CASCADE') //restrict will make it so it doesn't delete the parent record too (tickets record), we want it to cascade
  .onUpdate('CASCADE')

  student_tickets
      .integer('ticket_id')
      .unsigned()
      .unique() //tickets should be unique but not student IDs
      .references('id')
      .inTable('tickets')
      .onDelete('CASCADE') //restrict will make it so it doesn't delete the parent record too (tickets record), we want it to cascade
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
            .unsigned()
            .unique()
            .references('id')
            .inTable('students')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')

          users
            .integer('helper_id')
            .unsigned()
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
  .dropTableIfExists('helper_tickets')
  .dropTableIfExists('student_tickets')
  .dropTableIfExists('tickets');

};

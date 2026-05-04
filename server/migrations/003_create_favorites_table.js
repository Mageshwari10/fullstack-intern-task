exports.up = function(knex) {
  return knex.schema.createTable('favorites', function(table) {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('template_id').unsigned().references('id').inTable('templates').onDelete('CASCADE');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.unique(['user_id', 'template_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('favorites');
};


exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments(); //1, 2, 3... casos /*campo primário */

    table.string('title').notNullable();
    table.string('description').notNullable();/*campos da tabela */
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable(); //para ter o id da ONG que criou esse caso /*relacionamento */

    table.foreign('ong_id').references('id').inTable('ongs'); /*chave estrangeira */ //sempre que o ong_id tiver preenchido, ele precisa estar cadastrado dentro da tabela ONG
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};

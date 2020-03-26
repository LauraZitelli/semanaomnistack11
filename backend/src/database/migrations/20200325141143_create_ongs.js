
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();//aqui vc quer criar a ID da ONG, não quer que seja um número incrementado senão fica fácil de uma ONG descobrir o ID da outra.
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();// o parametro 2 é o tamanho do campo UF, que sabemos que sao só duas letras
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs')
};

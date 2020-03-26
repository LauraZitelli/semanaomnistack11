const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //essa é a conexão com o banco de dados dentro do ambiente de dev

module.exports = connection;
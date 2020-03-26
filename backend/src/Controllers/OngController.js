const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*'); //método que lista todas as ongs criadas
  
    return response.json(ongs);
  },

  async create(request, response){

    const { name, email, whatsapp, city, uf } = request.body;/*usando {name, email, ...} estamos desestruturando o body, armazenando cada dado dele 
    em uma variável diferente */  
    
    const id = crypto.pseudoRandomBytes(4).toString('HEX'); //gera 4 bites aleatórios de caracteres HEX

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })

    return response.json({ id });
  }
}
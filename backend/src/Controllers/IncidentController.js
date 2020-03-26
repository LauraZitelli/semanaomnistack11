const connection = require('../database/connection');

module.exports = {
  async index(request, response){
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();
    console.log(count);

    const incidents = await connection('incidents')
      .join('ongs', 'ong_id', '=', 'incidents.ong_id') /*relaciona a tabela ongs apenas para as ongs cujo 
      ong_id é igual ao ong_id da tabela incidents*/
      .limit(5) //limita a 5 o número de incidents listados por página
      .offset((page - 1) * 5) /*pula de 5 em 5 os incidents das páginas. Ex.: página 2 -> offset = 5 (pula
        5 incidents que já foram listados na página 1), etc */
      .select([
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf' 
      ]); //método que lista todas os incidentes e os campos específicos de ongs

    response.header('X-Total-Count', count['count(*)']); //devolve ao cabeçalho o total de casos
  
    return response.json(incidents);
  },

  async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization; //nome que eu dei pro header no Insomnia

    const [id] = await connection('Incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ id });
  },
  
  async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id) //busca o incident com id igual ao id passado pelo params
      .select('ong_id')
      .first(); //pq ele retorna só um resultado

      console.log(incident);
    

    if(incident.ong_id != ong_id){
      return response.status(401).json({ error: 'Operation not permitted.'});
    }

    await connection('incidents').where('id', id).delete(); //deleta o incident

    return response.status(204).send();
  }
};
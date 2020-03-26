const express = require('express'); //importando as funcionalidades do módulo express para a variável express
const routes = require('./routes');
const cors = require('cors'); //pacote de segurança que determina quem pode acessar a aplicação

const app = express(); //instanciando a aplicação

app.use(cors());
app.use(express.json()); //avisando o node que estaremos trabalhando com JSON dentro do body
app.use(routes); //importante que essa linha venha abaixo da express

app.listen(3333); 
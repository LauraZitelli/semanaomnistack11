import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'; //importando a api para conectar back e front

import './styles.css';

import logoImg from '../../assets/logo.svg';



export default function Register(){

  const history = useHistory();
  
  const [name, setName] = useState(''); //como é input de texto passa uma string vazia como estado inicial
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  async function handleRegister(event){
    event.preventDefault(); //o default é toda vez que vc clica em submit a página reiniciar. Com o preventDefault isso nao acontece

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    }; //data guarda todas as infos do front

    try{
      const response = await api.post('ongs', data); /*response guarda a resposta da requisição post da api*/
      alert(`Seu ID de acesso: ${response.data.id}`);/*acessa o id da resposta */

      history.push('/'); //envia o usuário de volta para a home após o cadastro
    } catch(err){
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="Nome da ONG" 
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={event => setEmail(event.target.value)}
            />
          <input 
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)} 
          />

          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}
              onChange={event => setCity(event.target.value)}
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }}
              value={uf}
              onChange={event => setUf(event.target.value)}
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>

        </form>
      </div>
    </div>
  );
}
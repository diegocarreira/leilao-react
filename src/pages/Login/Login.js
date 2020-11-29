import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';



const initialValues = {
  login : ''
  ,senha : ''
};

const usuariosCadastrados = [
  {
    id : 1
    ,login : 'admin'
    ,senha : 'admin'
    ,status : 1
  }
  ,{
    id : 2
    ,login : 'desativado'
    ,senha : 'desativado'
    ,status : 0
  }
];
localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));

// ## Para iniciar já contendo alguns dados para listagem
const listagemInicial = [
  {
    "nome": "Fiat Marea 1998 bordô",
    "valorInicial": "10000",
    "usado": 1,
    "usuarioResponsavel": "admin",
    "dataAbertura": "2020-11-28",
    "dataFinalizacao": "2020-12-31",
    "id": 1606659503642
  }
  ,{
    "nome": "Ford Corcel 1968",
    "valorInicial": "25000",
    "usado": 0,
    "usuarioResponsavel": "admin",
    "dataAbertura": "2020-11-23",
    "dataFinalizacao": "2020-11-28",
    "id": 1606659566920
  }
];
localStorage.setItem('leiloes', JSON.stringify(listagemInicial));


const PagesLogin = () => {
  const [values, setValues] = useState(initialValues);
  const history = useHistory();

  useEffect(() => {
    // ## Logoff
    localStorage.removeItem('usuarioLogado');
  }, []);


  function onchange(ev){
    const {name , value} = ev.target;
    setValues({...values, [name]: value});
  }

  function onsubmit(ev){
    ev.preventDefault();

    if(!values.login){
      try {
        toast.warning('Preencha o campo Login');
      } catch (e) {
        alert('Preencha o campo Login');
      }
      return true;
    }
    if(!values.senha){
      try {
        toast.warning('Preencha o campo Senha');
      } catch (e) {
        alert('Preencha o campo Senha');
      }
      return true;
    }

    let usuarioEncontrado;
    for(let i in usuariosCadastrados){
      if(
        (usuariosCadastrados[i].login == values.login)
        &&
        (usuariosCadastrados[i].senha == values.senha)
      ){
        usuarioEncontrado = usuariosCadastrados[i];
      }
    }

    if(usuarioEncontrado){
      if(usuarioEncontrado.status == 1){
        console.log('FIXME logar!');
        localStorage.setItem('usuarioLogado', usuarioEncontrado.id);
        history.push('/');
      }else{
        try {
          toast.error('Esse usuário está desativado');
        } catch (e) {
          alert('Esse usuário está desativado');
        }
        return true;
      }
    }else{
      try {
        toast.error('Usuário não cadastrado ou senha incorreta');
      } catch (e) {
        alert('Usuário não cadastrado ou senha incorreta');
      }
      return true;
    }

  }


  return(
    <div className="div-container">
      <h1>Leilões</h1>
      <div className="formulario">
        <form onSubmit={onsubmit}>

          <span className="subtitle">
            Faça seu login para acessar o sistema:
          </span>

          <div className="form-group">
            <label htmlFor="login">Login:</label>
            <input type="text" name="login" id="login" onChange={onchange} value={values.login} />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input type="password" name="senha" id="senha" onChange={onchange} value={values.senha} />
          </div>

          <div className="form-group">
            <input type="submit" name="entrar" id="entrar" value="Entrar" />
          </div>
        </form>
      </div>

    </div>
  );
}

export default PagesLogin;

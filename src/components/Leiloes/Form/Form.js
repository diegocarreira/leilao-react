import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './Form.css';
import { toast } from 'react-toastify';

const initialValues = {
  nome : ''
  ,valorInicial : 0
  ,usado : 0
  ,usuarioResponsavel : ''
  ,dataAbertura : ''
  ,dataFinalizacao : ''
};

const ComponentsLeiloesForm = ({ id }) => {
  const [values, setValues] = useState(initialValues);
  const [responsaveis, setResponsaveis] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // ## Alimentar o combo de resposaveis com os usuarios do sistema
    let aux = (localStorage.getItem("usuariosCadastrados")) ? JSON.parse(localStorage.getItem("usuariosCadastrados")) : [];
    let usuariosAtivos = [];
    for(let i in aux){
      if(aux[i].status == 1){
        usuariosAtivos.push(aux[i]);
      }
    }
    setResponsaveis(usuariosAtivos);

    // ## Se é edição
    if(id){
      let leiloes = (localStorage.getItem("leiloes")) ? JSON.parse(localStorage.getItem("leiloes")) : null;
      if(leiloes){
        for(let i in leiloes){
          if(leiloes[i].id == id){
            setValues({
              nome : leiloes[i].nome
              ,valorInicial : leiloes[i].valorInicial
              ,usado : leiloes[i].usado
              ,usuarioResponsavel : leiloes[i].usuarioResponsavel
              ,dataAbertura : leiloes[i].dataAbertura
              ,dataFinalizacao : leiloes[i].dataFinalizacao
            });
          }
        }
      }
    }
  }, []);


  function onchange(ev){
    const {name , value} = ev.target;
    console.log('name: ',name);
    console.log('value: ',value);
    setValues({...values, [name]: value});
  }

  function onsubmit(ev){
    ev.preventDefault();
    console.log('values: ',values);
    // return true;

    if(!values.nome){
      try {
        toast.warning('Preencha o campo Nome');
      } catch (e) {
        alert('Preencha o campo Nome');
      }
      return true;
    }
    if(!values.valorInicial || values.valorInicial <= 0){
      try {
        toast.warning('Preencha o campo Valor Inicial');
      } catch (e) {
        alert('Preencha o campo Valor Inicial');
      }
      return true;
    }
    if(values.usado != 0 && values.usado != 1){
      try {
        toast.warning('Preencha o campo Usado');
      } catch (e) {
        alert('Preencha o campo Usado');
      }
      return true;
    }
    if(!values.usuarioResponsavel){
      try {
        toast.warning('Preencha o campo Responsável');
      } catch (e) {
        alert('Preencha o campo Responsável');
      }
      return true;
    }
    if(!values.dataAbertura){
      try {
        toast.warning('Preencha o campo Data de abertura');
      } catch (e) {
        alert('Preencha o campo Data de abertura');
      }
      return true;
    }
    if(!values.dataFinalizacao){
      try {
        toast.warning('Preencha o campo Data de Finalização');
      } catch (e) {
        alert('Preencha o campo Data de Finalização');
      }
      return true;
    }

    let leiloes = (localStorage.getItem("leiloes")) ? JSON.parse(localStorage.getItem("leiloes")) : [];

    if(id){
      // ## Update
      for(let i in leiloes){
        if(leiloes[i].id == id){
          let aux = values;
          aux.id = id;
          leiloes[i] = aux;
        }
      }

    }else{
      // ## Insert
      leiloes.push({...values, 'id': Date.now() });
    }

    localStorage.setItem('leiloes',JSON.stringify(leiloes));
    toast.success('Salvo!');
    history.push('/');

  }

  return (
      <form onSubmit={onsubmit}>

        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input type="text" name="nome" id="nome" onChange={onchange} value={values.nome} />
        </div>
        <div className="form-group">
          <label htmlFor="valorInicial">Valor Inicial</label>
          <input type="number" name="valorInicial" id="valorInicial" onChange={onchange} value={values.valorInicial} />
        </div>
        <div className="form-group">
          <label htmlFor="usado">Esse item é usado ?</label>
          <select className="" name="usado" id="usado" onChange={onchange} value={values.usado}>
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="usuarioResponsavel">Usuario Responsavel</label>
          <select className="" name="usuarioResponsavel" id="usuarioResponsavel" onChange={onchange} value={values.usuarioResponsavel}>
          <option value="">Selecione...</option>
            {
              responsaveis.map(
                (resp) =>
                <option key={resp.id} value={resp.login}>{resp.login}</option>
              )
            }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dataAbertura">Data de Abertura</label>
          <input type="date" name="dataAbertura" id="dataAbertura" onChange={onchange} value={values.dataAbertura} />
        </div>
        <div className="form-group">
          <label htmlFor="dataFinalizacao">Data de Finalização</label>
          <input type="date" name="dataFinalizacao" id="dataFinalizacao" onChange={onchange} value={values.dataFinalizacao} />
        </div>

        <div className="form-group">
          <input type="submit" name="salvar" id="salvar" value="Salvar" />
        </div>

      </form>
  );
}

export default ComponentsLeiloesForm;

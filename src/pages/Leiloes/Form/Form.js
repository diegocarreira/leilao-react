import React, {useState, useEffect} from 'react';
import './Form.css';
import { useParams , useHistory} from 'react-router-dom';
import ComponentsLeiloesForm from 'components/Leiloes/Form/Form';
import ComponentsHeader from 'components/Header/Header';
import { toast } from 'react-toastify';



const PagesLeiloesForm = () => {
  const { id } = useParams();
  const [logado, setLogado] = useState(0);
  const history = useHistory();


  useEffect(() => {
    // ## Valida login
    let usuarioLogado = (localStorage.getItem("usuarioLogado")) ? Number.parseInt(localStorage.getItem("usuarioLogado"),10) : null;
    if(usuarioLogado <= 0){
      // ## Redirecioana para tela de Login
      try {
        toast.error('Você precisa efetuar login para acessar o sistema!');
      } catch (e) {
        alert('Você precisa efetuar login para acessar o sistema!');
      }
      history.push('/login');
      return true;
    }else{
      // ## Pode prosseguir
      setLogado(1);
    }

  }, []);

  if(!logado || logado <= 0){
    return(
      <div></div>
    );
  }

  return (
    <div>
      <ComponentsHeader />
      <div className="div-container">
        <h1>Novo Leilão</h1>
        <div className="formulario">
          <ComponentsLeiloesForm id={id ? Number.parseInt(id, 10) : null}></ComponentsLeiloesForm>
        </div>
      </div>
    </div>
  );
}

export default PagesLeiloesForm;

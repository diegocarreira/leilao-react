import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import './List.css';
import ComponentsLeiloesListItem from 'components/Leiloes/List/Item/Item';
import ComponentsHeader from 'components/Header/Header';
import { toast } from 'react-toastify';


const PagesLeiloesList = () => {
  const [arrLeiloes, setArrLeiloes] = useState([]);
  const [logado, setLogado] = useState(0);
  const history = useHistory();


  const getLeiloes = () => {
    console.log('getLeiloes called');
    let aux = (localStorage.getItem("leiloes")) ? JSON.parse(localStorage.getItem("leiloes")) : [];
    console.log('arrLeiloes: ',aux);
    setArrLeiloes(aux);
  }

  const deleteItem = (id) => {
    if(window.confirm("Tem certeza que deseja deletar esse item ?")){
      let temp = arrLeiloes;
      for(let i in temp){
        if(temp[i].id == id){
          temp.splice(i,1);
        }
      }
      // ## Seta array apos item removido
      localStorage.setItem('leiloes',JSON.stringify(temp));
      // ## Reload lista de leiloes
      getLeiloes();
    }
  }

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
      // ## Lista os itens
      getLeiloes();
    }

  }, []);

  if(!logado || logado <= 0){
    return(
      <div></div>
    );
  }

  return(
    <div>
      <ComponentsHeader />
      <div className="div-container">
        <h1>Lista de leilões</h1>
        <div className="lista">
        {
          arrLeiloes.map(
            (leilao) =>
            <ComponentsLeiloesListItem
              key={leilao.id}
              leilao={leilao}
              onClickDelete={()=>{
                deleteItem(leilao.id);
              }}
            >
            </ComponentsLeiloesListItem>
          )
        }
        </div>
      </div>


    </div>
  );
}

export default PagesLeiloesList;

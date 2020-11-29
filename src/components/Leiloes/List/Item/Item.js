import React from 'react';
import './Item.css';
import {Link} from 'react-router-dom';
import {BsFillTrashFill, BsPencil} from 'react-icons/bs';
import Uteis from 'Uteis/Uteis';

const ComponentsLeiloesListItem = ({leilao, onClickDelete}) => {



  const now = Uteis.getDateNow();

  return (

    <div className="leilao-item">

      <span className="nome">
        <i>#{leilao.id} -</i> {leilao.nome}
      </span>
      <span className="valor">R$ {leilao.valorInicial.replace('.',',')}</span>

      <div className="infos">


        <div className="group">
          <span className="usado"><b>Esse item é:</b> {(leilao.usado == 1) ? 'usado' : 'novo'}</span>

          <span className="responsavel"><b>Responsável:</b> {leilao.usuarioResponsavel}</span>
        </div>

        <div className="group">
          <span className="dt-abertura"><b>Abertura:</b> {Uteis.dateDb2DateClient(leilao.dataAbertura) ? Uteis.dateDb2DateClient(leilao.dataAbertura) : leilao.dataAbertura}</span>

          {leilao.dataFinalizacao >= now && (
            <span className="dt-finalizacao"><b>Finaliza em:</b> {Uteis.dateDb2DateClient(leilao.dataFinalizacao) ? Uteis.dateDb2DateClient(leilao.dataFinalizacao) : leilao.dataFinalizacao}</span>
          )}
          {leilao.dataFinalizacao < now && (
            <span className="dt-finalizacao">
              <b> <u>Finalizado</u> em: </b> {Uteis.dateDb2DateClient(leilao.dataFinalizacao) ? Uteis.dateDb2DateClient(leilao.dataFinalizacao) : leilao.dataFinalizacao}
            </span>
          )}
        </div>


      </div>

      <div className="buttons">
        <button type="button" className="button delete-button" onClick={onClickDelete}>
          <BsFillTrashFill />
          Remover
        </button>

        <Link to={`/edit/${leilao.id}`} className="button edit-button">
          <BsPencil />
          Editar
        </Link>

      </div>

    </div>
  );

}
export default ComponentsLeiloesListItem;

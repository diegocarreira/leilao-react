import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const ComponentsHeader = () => {

  return (
    <header>

      <Link to="/" className="menu-button">
        Leilões
      </Link>
      <Link to="/novo" className="menu-button">
        Novo leilão
      </Link>
      <Link to="/login" className="menu-button">
        Logout
      </Link>

    </header>
  );

}
export default ComponentsHeader;

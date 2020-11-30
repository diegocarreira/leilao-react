import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PagesLeiloesList from 'pages/Leiloes/List/List';
import PagesLeiloesForm from 'pages/Leiloes/Form/Form';
import PagesLogin from 'pages/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'

const Root = () => {

  return(
    <Router>
      <ToastContainer />
      <Switch>
        <Route path="/login" component={PagesLogin} />
        <Route path="/novo" component={PagesLeiloesForm} />
        <Route path="/edit/:id" component={PagesLeiloesForm} />
        <Route path="/" component={PagesLeiloesList} />
      </Switch>
    </Router>

  );

}
export default Root;

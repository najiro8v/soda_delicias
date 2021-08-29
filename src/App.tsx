import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Express from './components/Express';
import Menu from "./components/Menu";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Contacto from "./components/Contacto";
import AddProduct from "./components/AddProduct";


function App() {
  return (
    <div className="container-xl">
      
    {/*  <Menu></Menu>
      <Router>
        <Switch>
          <Route exact path="/">
          <Express></Express>
          </Route> 
          <Route  path="/express">
          <Express></Express>
          </Route> 
        </Switch>
      </Router>*/}
      <Router>
      <Menu></Menu>
        <Switch>
          <Route exact path="/" component={Inicio}></Route> 
          <Route  path="/Producto" component={AddProduct}></Route> 
          <Route  path="/express" component={Express}></Route>
          <Route  path="/listado" component={Admin}></Route>
          <Route  path="/login" component={Login}></Route> 
          <Route  path="/contacto" component={Contacto}></Route> 
        </Switch>
      </Router>

    </div>
  );
}

export default App;
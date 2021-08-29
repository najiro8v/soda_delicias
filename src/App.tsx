import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Express from './components/Express';
import Menu from "./components/Menu";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import AddProduct from "./components/AddProduct";
import MenuComida from "./components/MenuComida";
import { auth, dbNSQL } from "./firebaseconfig";

function App() {
  const [usuario, setUsuario] = useState(null as any);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dbNSQL.collection("user").get().then((data: any) => {
          let usuario = data.docs.map((element: any) => { let { uid } = element.data(); if (uid === user.uid) { return element.data() } else { return undefined } }).filter((data: any) => data !== undefined)[0];
          setUsuario(usuario.tipo);
        })
      }
      else {
        setUsuario(null);
      }
    })
  }, [])
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
          <Route path="/express" component={Express}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/menu" component={MenuComida}></Route>
          {usuario ? usuario !== "Administrador" ?
            <Switch>
              <Route path="/edit" component={EditUser}></Route>
            </Switch> :
            <Switch>
              <Route path="/edit" component={EditUser}></Route>
              
              <Route path="/addProduct" component={AddProduct}></Route>
            </Switch>
            : null
          }
        </Switch>
      </Router>

    </div>
  );
}

export default App;
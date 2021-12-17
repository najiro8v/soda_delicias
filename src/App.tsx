import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Express from './components/Express';
import ExpressEdit from './components/ExpressEdit';
import Menu from "./components/Menu";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import AddProduct from "./components/AddProduct";
import MenuComida from "./components/MenuComida";
import MenuComidaAdmin from "./components/MenuComidaAdmin";
import Footer from './components/Footer';
import Contacto from './components/Contacto';
import Carrito from "./components/Carrito";
import { auth, dbNSQL } from "./firebaseconfig";

function App() {
  const [usuario, setUsuario] = useState(null as any);
  const [compras, setCompras] = useState([] as any);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dbNSQL.collection("user").get().then((data: any) => {
          let usuario = data.docs.map((element: any) => { let { uid } = element.data(); if (uid === user.uid) { return element.data() } else { return undefined } }).filter((data: any) => data !== undefined)[0];
          setUsuario(usuario === undefined ? null : usuario.tipo);
          window.localStorage.setItem("userType",usuario)
        })
      }
      else {
        setUsuario(null);
      }
    })
  }, [])
  return (
    <div className="container-fluid col-12">
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
          <Route path="/express" component={usuario !== "Administrador" ? Express : ExpressEdit} />
          <Route path="/login" component={Login}></Route>
          <Route path="/contacto" component={Contacto}></Route>
          <Route path="/menu" >{usuario !== "Administrador" ? <MenuComida  compras={compras} editCompras={setCompras} />: <MenuComidaAdmin/>}</Route>
          <Route path="/carrito" ><Carrito compras={compras} editCompras={setCompras}></Carrito> </Route>

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
        <div  style={{marginTop:"3em"}} ><Footer></Footer></div>
    </div>
  );
}

export default App;
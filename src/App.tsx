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
import "process";

function App() {
  const [usuario, setUsuario] = useState(null as any);
  const [usuarioID, setUsuarioID] = useState(null as any);
  const [compras, setCompras] = useState([] as any);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        await dbNSQL.collection("user").get().then((data: any) => {
          let usuario = data.docs.map((element: any) => { let { uid } = element.data(); if (uid === user.uid) { let obj=element.data(); obj.id=element.id;return obj; } else { return undefined } }).filter((data: any) => data !== undefined)[0];
          setUsuario(usuario === undefined ? null : usuario.tipo);
          setUsuarioID(usuario === undefined ? null : usuario.id);
          window.localStorage.setItem("userType", usuario)
        })
      }
      else {
        setUsuario(null);
      }
    })
  }, [])
  return (
    <div className="container-fluid col-12">
      <Router>
        <Menu></Menu>

        <Switch>
          <Route exact path="/" component={Inicio}></Route>
          <Route path="/express" component={usuario !== "Administrador" ? Express : ExpressEdit} />
          <Route path="/login" component={Login}></Route>
          <Route path="/contacto" component={Contacto}></Route>
          <Route path="/menu" >{usuario !== "Administrador" ? <MenuComida compras={compras} editCompras={setCompras} /> : <MenuComidaAdmin />}</Route>
          <Route path="/carrito" ><Carrito compras={compras} editCompras={setCompras}></Carrito> </Route>

          {usuario ? usuario !== "Administrador" ?
            <Switch>
              <Route path="/edit"><EditUser userId={usuarioID}></EditUser></Route>
            </Switch> :
            <Switch>
              <Route path="/edit"><EditUser userId={usuarioID}></EditUser></Route>
              <Route path="/addProduct" component={AddProduct}></Route>
            </Switch>
            : null
          }
        </Switch>
      </Router>
      <div style={{ marginTop: "3em" }} ><Footer></Footer></div>
    </div>
  );
}

export default App;
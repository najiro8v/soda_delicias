import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//"0jEWEhpq0PXCKDbK9Ag6xeTQrDU2";
const MenuNormal = () => {
    return (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Menu">Menú</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/contacto">Contactenos</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/express" >Express</Link>
            </li>
        </Fragment>
    )
}

const MenuUser = () => {
    return (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Menu">Menú</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/contacto">Contactenos</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/express" >Express</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/listado" >Listado</Link>
            </li>
        </Fragment>
    )
}


const MenuAdmin = () => {
    return (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Menu">Agregar Producto</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/contacto">Contactenos</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/express" >Express</Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link" to="/listado" >Listado</Link>
            </li>
        </Fragment>
    )
}

export {MenuUser,MenuAdmin};
import React, { Fragment } from "react";
import { Link } from "react-router-dom";


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
                <Link className="nav-link" to="/addProduct">Productos</Link>
            </li>
            {/*<li className="nav-item ">
                <Link className="nav-link" to="/editmenu">Editar menu</Link>
    </li>*/}
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

export { MenuUser, MenuAdmin, MenuNormal };
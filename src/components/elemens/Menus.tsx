import React, { Fragment } from "react";
import { Link } from "react-router-dom";





const MenuAdmin = () => {

    return (
        <Fragment>
            <li className="nav-item ">
                <Link className="nav-link" to="/express" >Express</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/addProduct">Productos</Link>
            </li>
            {/*<li className="nav-item ">
                <Link className="nav-link" to="/editmenu">Editar menu</Link>
    </li>*/}
        </Fragment>
    )
}

export { MenuAdmin };
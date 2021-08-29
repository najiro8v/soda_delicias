import React, { useEffect, useState, Fragment } from "react";
import {NavDropdown } from "react-bootstrap";
import { MenuAdmin,MenuUser } from "./elemens/Menus";
import { auth } from "../firebaseconfig";
import { useHistory } from "react-router-dom";


const Menu = () => {
	const history = useHistory();
	const [usuario, setUsuario] = useState(null as any)
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUsuario(user.email);
			}
		})
	}, [])
	const cerrarSesion = () => {
		auth.signOut();
		setUsuario(null);
		history.push("/");
	}
	return (
		<Fragment >
			<div className="container-fluid d-flex justify-content-between w-100">
				<nav className="navbar navbar-expand-md navbar-light bg-white">
					<button className="navbar-toggler" data-bs-toggle="collapse" type="button" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="true" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse " id="navbarContent">
						<ul className="navbar-nav">
							
							{usuario?
							
								<MenuUser/>:<MenuAdmin/>

							}
							<li className="nav-item d-block d-lg-none d-md-none d-xl-none text-light bg-white"  >
								{
									usuario ?
										<NavDropdown
											id="nav-dropdown-dark-example"
											className="nav-link  "
											title={<i className="bi bi-gear "></i>}
										>
											<NavDropdown.Item onClick={(e) => { history.push("action-2") }}>Seting</NavDropdown.Item>
											<NavDropdown.Item onClick={(e) => { history.push("action-2") }}>Seting</NavDropdown.Item>
											<NavDropdown.Item onClick={(e) => { history.push("action-2") }}>Seting</NavDropdown.Item>
											<NavDropdown.Divider />
											<NavDropdown.Item onClick={cerrarSesion}>Cerrar Sesion</NavDropdown.Item>
										</NavDropdown>
										: <span
											className="nav-link me-3"
											onClick={() => { history.push("/login") }}
										>Login</span>
								}
							</li>




						</ul>

					</div>
				</nav>
				<div className="d-none d-lg-block d-md-block d-xl-block">
					{
						usuario ?
							<NavDropdown
								id="nav-dropdown-dark-example "
								title={<i className="bi bi-gear text-secondary"></i>}
							>
								<NavDropdown.Item onClick={(e) => { history.push("action-2") }}>Seting</NavDropdown.Item>
								<NavDropdown.Item onClick={(e) => { history.push("action-2") }}>Seting</NavDropdown.Item>
								<NavDropdown.Item onClick={(e) => { history.push("action-2") }}>Seting</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={cerrarSesion}>Cerrar Sesion</NavDropdown.Item>
							</NavDropdown> : <span
								className="nav-link me-3 outline-dark text-secondary"
								onClick={() => { history.push("/login") }}
							>Login</span>
					}
				</div>
			</div>

		</Fragment >


	);
};

export default Menu;

/*<Fragment >
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-white">
						<button className="navbar-toggler" data-bs-toggle="collapse" type="button" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="true" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
					<div className="collapse navbar-collapse " id="navbarContent">
						<ul className="navbar-nav ">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="#a">Productos</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="#a" target="_blank">Contactenos</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link " to="/express" >Express</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>

		</Fragment >*/
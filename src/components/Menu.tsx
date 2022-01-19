import React, { useEffect, useState, Fragment } from "react";
import { NavDropdown } from "react-bootstrap";
import { MenuAdmin } from "./elemens/Menus";
import { auth, dbNSQL } from "../firebaseconfig";
import { useHistory, Link } from "react-router-dom";


const Menu = () => {
	const history = useHistory();
	const [usuario, setUsuario] = useState(null as any)
	const [iCart, setIcart] = useState("cart")
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				try {
					await dbNSQL.collection("user").get().then((data: any) => {
						let usuario = data.docs.map((element: any) => { let { uid } = element.data(); if (uid === user.uid) { return element.data() } else { return undefined } }).filter((data: any) => data !== undefined)[0];
						setUsuario(usuario === undefined ? null : usuario.tipo);
					})
				} catch (e) { console.error(e) }
			}
		})
	}, [])

	const cerrarSesion = () => {
		auth.signOut();
		setUsuario(null);
		history.push("/");
	}

	const hoverCart = (e: any) => {
		setIcart(iCart === "cart" ? "cart-plus-fill" : "cart")
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
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/Menu">Menú</Link>
							</li>
							<li className="nav-item ">
								<Link className="nav-link" to="/contacto">Contáctenos</Link>
							</li>
							{usuario === "Administrador" ? <MenuAdmin /> : null}
							<li className="nav-item d-block d-lg-none d-md-none d-xl-none text-light bg-white" >
								<i className={"bi bi-" + iCart + " text-secondary"}
									onMouseEnter={(e) => { e.preventDefault(); hoverCart(e) }}
									onMouseLeave={(e) => { e.preventDefault(); hoverCart(e) }}
									onClick={() => { history.push("/carrito") }}></i>
							</li>
							<li className="nav-item d-block d-lg-none d-md-none d-xl-none text-light bg-white"  >
								{
									usuario ?
										<NavDropdown
											id="nav-dropdown-dark-example"
											className="nav-link  "
											title={<i className="bi bi-gear "></i>}
										>
											<NavDropdown.Item onClick={(e) => { history.push("edit") }}>Editar Perfil</NavDropdown.Item>
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
					<i className={"bi bi-" + iCart + " text-secondary"}
						onMouseEnter={(e) => { e.preventDefault(); hoverCart(e) }}
						onMouseLeave={(e) => { e.preventDefault(); hoverCart(e) }}
						onClick={() => { history.push("/carrito") }}
					></i>
					{
						usuario ?
							<NavDropdown
								id="nav-dropdown-dark-example "
								title={<i className="bi bi-gear text-secondary"></i>}
								className="d-inline-block"
							>
								<NavDropdown.Item onClick={(e) => { history.push("edit") }}>Editar Perfil</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={cerrarSesion}>Cerrar Sesion</NavDropdown.Item>
							</NavDropdown> : <span
								className="nav-link me-3 outline-dark text-secondary d-inline-block"
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
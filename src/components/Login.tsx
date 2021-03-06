import React, { useState } from "react";
import { auth, dbNSQL } from "../firebaseconfig"
import { useHistory } from "react-router-dom";
const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgError, setMsgError] = useState("");
    const [login, setLogin] = useState(true);
    const RegistrarUsuario = (e: any) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((r: any) => {
                let Product = {
                    uid: r.user.uid,
                    email: email,
                    tipo: "usuario",
                    nombre: null,
                    edad: null,
                    numero: null,
                    dirrecion: null,
                    img:"https://firebasestorage.googleapis.com/v0/b/soda-delicias.appspot.com/o/UserIcons%2FClientDefault.png?alt=media&token=83457130-a434-4b8f-b35a-8f2a264dbb21",
                }
                dbNSQL.collection("user").add(Product);
                history.push("/");
            })
            .catch(err => {
                if (err.code === "auth/invalid-email") {
                    setMsgError("Formato de correo electrónico Incorrecto");
                }
                else if (err.code === "auth/weak-password") {
                    setMsgError("Contraseña debil, debe tener más de 6 caracteres");
                }
                else if (err.code === "auth/email-already-in-use") {
                    setMsgError("Ya existe un usuario con ese correo");
                }

            })

    }

    const LoginUser = (e: any) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((r: any) => {history.push("/") })
            .catch((err) => {
                if (err.code === "auth/wrong-password") {
                    setMsgError("Contranseña Incorrecta");
                }
                else if (err.code === "auth/user-not-found") {
                    setMsgError("Usuario no registrado");
                }
                else if (err.code === "auth/invalid-email") {
                    setMsgError("Formato de correo electrónico Incorrecto");
                }
                else if (err.code === "auth/weak-password") {
                    setMsgError("Contraseña debil, debe tener más de 6 caracteres");
                }
            })
    }
    return (
        <div className="row mt-5 container-fluid m-0">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={login ? LoginUser : RegistrarUsuario} className="form-group">
                    <input
                        onChange={(e) => { setEmail(e.target.value); }}
                        className="form-control"
                        placeholder="Introduce un correo"
                        type="email"
                    />
                    <input
                        autoComplete="true"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                        className="form-control mt-4"
                        placeholder="Introduce una contraseña"
                        type="password"

                    />
                    {login ?
                        <div className="input-group">
                            <input className="btn btn-block mt-4 btn-outline-warning w-100"
                                type="submit"
                                value="Iniciar Sesión"
                            />
                            <p className="font-weight-light mt-4 text-center">Si no tienes una cuenta Registrate <span className="link" style={{ cursor: "pointer" }} onClick={() => { setLogin(!login) }}><u className="text-primary">Aquí</u></span></p>
                        </div>
                        :
                        <div className="input-group">
                            <input
                                className="form-control btn btn-block mt-4 btn-outline-dark w-100"
                                type="submit"
                                value="Registrar usuario" />
                            <p className="font-weight-light mt-4 text-center">Si ya tienes una cuenta puedes logearte <span className="link" style={{ cursor: "pointer" }} onClick={() => { setLogin(!login) }}><u className="text-primary">Aquí</u></span></p>
                        </div>

                    }
                </form>

            </div>
            <div className="col"></div>
            {
                msgError.length === 0 ? null : <div className="alert alert-danger mt-4 text-center" role="alert">{msgError}</div>
            }
        </div>
    )
}

export default Login;
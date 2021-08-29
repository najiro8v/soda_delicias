import React, { useState } from "react";
import { auth } from "../firebaseconfig"
import { useHistory } from "react-router-dom";
const Login = () => {
    const history=useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msgError, setMsgError] = useState("");
    const RegistrarUsuario = (e: any) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(r => { history.push("/") })
            .catch(err => {
                console.error(err.code);
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

    const LoginUser=(e:any)=>{
        auth.signInWithEmailAndPassword(email,password).then((r:any)=>{/*console.log(r.user.uid);*/history.push("/")})
        .catch((err)=>{
            console.error(err);
            if (err.code === "auth/wrong-password") {
                setMsgError("Contranseña Incorrecta");
            }
            else if(err.code === "auth/user-not-found") {
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
    /*
    auth/invalid-email
    auth/weak-password
    */
    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group">
                    <input
                        onChange={(e) => { setEmail(e.target.value);  }}
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
                    <input
                        className="btn btn-block mt-4 btn-outline-dark w-100"
                        type="submit"
                        value="Registrar usuario"
                    />
                </form>
                <button className="btn btn-block mt-4 btn-outline-warning w-100" onClick={LoginUser}>
                    Iniciar Sesión
                </button>
            </div>
            <div className="col"></div>
            {
                msgError.length === 0 ? null : <div className="alert alert-danger mt-4 text-center" role="alert">{msgError}</div>
            }
        </div>
    )
}

export default Login;
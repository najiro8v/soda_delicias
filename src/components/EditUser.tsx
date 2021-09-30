import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { dbNSQL, auth } from "../firebaseconfig";
const EditUser = () => {
    const history = useHistory();
    const [id, setId] = useState("");
    const [usuario, setUsuario] = useState(null as any);
    const [edad, setEdad] = useState("");
    const [numero, setNumero] = useState("");
    const [dirrecion, setDirrecion] = useState("");
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [img, setImg] = useState(null as any);
    //email, tipo, nombre, edad, dirrecion, img
    const subirFoto = async (e: any) => {
        e.preventDefault();
        try {
            let { uid,tipo } = usuario;
            let Product = {
                uid:uid||"",
                tipo:tipo||"",
                email:email||"",
                numero: numero||"",
                nombre: nombre||"",
                edad: edad||"",
                dirrecion: dirrecion||"",
                img:img||""
            }
            dbNSQL.collection("user").doc(id).set(Product).then((e:any)=>{
                
                history.push("/")
            });
        } catch (e) { console.error(e); }

    }
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    await dbNSQL.collection("user").get().then((data: any) => {
                        let usuario = data.docs.map((element: any) => { let { uid } = element.data(), data = element.data(), { id } = element; data.id = id; if (uid === user.uid) { return data } else { return undefined } }).filter((data: any) => data !== undefined)[0];
                        let { id, email, numero, nombre, edad, dirrecion, img } = usuario;
                        
                        setUsuario(usuario);
                        setDirrecion(dirrecion)
                        setId(id)
                        setImg(img);
                        setNumero(numero);
                        setNombre(nombre);
                        setEmail(email)
                        setEdad(edad)
                    })
                } catch (e) { console.error(e) }
            }
            else {
            }
        })
    }, [])
    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <form className="form-group" onSubmit={subirFoto}>
                        <h3 className="text-center mb-3" >Perfil</h3>
                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-person-lines-fill"></i></button>
                            <input className="form-control" type="text" value={nombre} placeholder={"Nombre"} onChange={(e) => { setNombre(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-envelope-fill"></i></button>
                            <input className="form-control" type="text" value={email} placeholder={"Email"} onChange={(e) => { setEmail(e.target.value) }} disabled />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-telephone-fill"></i></button>
                            <input className="form-control" type="text" value={numero} placeholder={"Número teléfonico"} onChange={(e) => { setNumero(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-calendar"></i></button>
                            <input className="form-control disabled" type="date" value={edad} placeholder={"Fecha de nacimiento"} onChange={(e) => { setEdad(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-geo-alt-fill"></i></button>
                            <textarea className="form-control disabled" value={dirrecion==null?"":dirrecion} placeholder={"Dirección a domicilio"} onChange={(e) => { setDirrecion(e.target.value) }} ></textarea>
                        </div>
                        <div className="input-group mt-3">
                            <div className="input-group">
                                {
                                    img ? <button className="btn btn-success " id="btn-show-psw" type="button"><i className="bi bi-file-earmark-image"></i></button> :
                                        <button className="btn btn-outline-secondary disabled" type="button"><i className="bi bi-file-earmark-image"></i></button>
                                }
                                <label htmlFor="FormControlFile1" className="btn btn-outline-info col">{img != null ? img[0] ? img[0].name : "Seleccione la foto de perfil" : "Seleccione la foto de perfil"}</label>

                            </div>
                            <input type="file" className="form-control-file  d-none" id="FormControlFile1" />{/**onChange={(e: any) => { e.target.files.length !== 0 ? setImg(e.target.files) : setImg(null); }} */}
                        </div>
                        <input type="submit" className="form-control mt-3 btn btn-outline-secondary" value="Guardar los Cambios" />
                    </form>
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default EditUser;

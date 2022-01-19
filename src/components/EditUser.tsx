import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {  auth, storageBucket } from "../firebaseconfig";
import "../css/EditUser.css";
const Plantilla = "https://firebasestorage.googleapis.com/v0/b/soda-delicias.appspot.com/o/UserIcons%2FClientDefault.png?alt=media&token=83457130-a434-4b8f-b35a-8f2a264dbb21";
const EditUser = () => {
    const history = useHistory();
    const [id, setId] = useState("");
    const [usuario, setUsuario] = useState(null as any);
    const [pathImg, setPathImg] = useState("");
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
            let file = img[0];
            let storageRef = await storageBucket.ref('UsersIcons/' + id);
            await storageRef.put(file).then(async (data: any) => {

                await storageRef.getDownloadURL().then((ulr: any) => {
                    setPathImg(ulr);
                });
            });
            let myHeaders = new Headers();
            let raw = {
                id,
                img: pathImg,
                dirrecion, 
                numero,
                nombre,
                edad
            }
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "*");
            await fetch("http://localhost:8080/api/user/", {
                method: 'POST',
                body: JSON.stringify(raw),
                headers: myHeaders,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    history.push("/")
                })
                .catch(error => console.log('error', error));
            /*
            dbNSQL.collection("user").doc(id).set(Product).then((e: any) => {
                history.push("/")
            });*/
        } catch (e) { console.error(e); }

    }
    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    let myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Access-Control-Allow-Origin", "*");
                    await fetch("http://localhost:8080/api/user/VL3B5sMYyo5AAuhfhqxX", {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    })
                        .then(response => response.json())
                        .then(result => {
                            let { id, email, numero, nombre, edad, dirrecion, img } = result;
                            setUsuario(usuario);
                            setDirrecion(dirrecion)
                            setId(id)
                            setImg(img);
                            setPathImg(img)
                            setNumero(numero);
                            setNombre(nombre);
                            setEmail(email)
                            setEdad(edad)
                        })
                        .catch(error => console.log('error', error));
                    /* await dbNSQL.collection("user").get().then((data: any) => {
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
                     })*/
                } catch (e) { console.error(e) }
            }
            else {
            }
        })
    }, [])
    return (
        <div className="container">
            <div className="row">

                <div className="col"><div>
                    <input type="file" className="form-control-file  d-none" id="FormControlFile2"
                        onChange={(e: any) => { if (e.target.files.length !== 0) { setImg(e.target.files); setPathImg(URL.createObjectURL(e.target.files[0])); } else { setImg(null); setPathImg(""); } }} />
                    <div style={{ borderRadius: "100%", height: "150px", width: "150px", display: "flex", alignItems: "center" }}>
                        <div className="HoverLabel">

                            <img style={{ position: "absolute", top: "0px", height: "150px", width: "150px", borderRadius: "100%" }} src={img ? pathImg : Plantilla} alt="" className="text-primary" />
                            <div className="HoverLabelImage"><label htmlFor="FormControlFile2" className="btn btn-outline text-primary m-0 p-0 "><i className="bi bi-file-earmark-image"></i></label></div>
                        </div>
                    </div>

                </div></div>
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
                            <textarea className="form-control disabled" value={dirrecion == null ? "" : dirrecion} placeholder={"Dirección a domicilio"} onChange={(e) => { setDirrecion(e.target.value) }} ></textarea>
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
import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";
const Admin = () => {
    const [mod, setMod] = useState(false);
    const [nombre, setNombre] = useState("");
    const [idUser, setIdUser] = useState("");
    const [phone, setPhone] = useState("");
    const [users, setUsers] = useState([] as any);
    const [error, setError] = useState(null as any);
    useEffect(() => {
        const getUsuarios = async () => {
            const { docs } = await dbNSQL.collection("agenda").get();
            const newArray = docs.map((item: any) => ({ id: item.id, ...item.data() }));
            setUsers(newArray);
        }
        getUsuarios();
    }, []);
    const ActualizarUser = async (id: string) => {
        try {
            const data = await dbNSQL.collection("agenda").doc(id).get();
            const { nombre, telefono } = data.data() || { nombre: "", telefono: "" };//forma para destructurar un objeto indefinido
            setNombre(nombre);
            setPhone(telefono);
            console.log(data.data());
            setIdUser(id)
            setMod(true)
        } catch (error) {
            console.error(error);
        }
    }
    const BorrarUser = async (id: string) => {
        try {
            await dbNSQL.collection("agenda").doc(id).delete();
            const { docs } = await dbNSQL.collection("agenda").get();
            const newArray = docs.map((item: any) => ({ id: item.id, ...item.data() }));
            setUsers(newArray);
        } catch (error) {
            console.log(error);
        }
    }
    const setUpdate = async (e: any) => {
        e.preventDefault(); if (!phone.trim()) {
            setError("El campo teléfono esta vacío");
        }
        else if (!nombre.trim()) {
            setError("El campo nombre esta vacío");
        }
        else {
            setError(null);
            try {
                const usuarioObj = { nombre: nombre, telefono: phone };
                await dbNSQL.collection("agenda").doc(idUser).update(usuarioObj);
                const { docs } = await dbNSQL.collection("agenda").get();
                const newArray = docs.map((item: any) => ({ id: item.id, ...item.data() }));
                setUsers(newArray);
                setMod(false);
                setIdUser("");

            } catch (e) {
                console.error(e);
            }
            setNombre("");
            setPhone("");
        }
    }
    const setUsuarios = async (e: any) => {
        e.preventDefault();
        if (!phone.trim()) {
            setError("El campo teléfono esta vacío");
        }
        else if (!nombre.trim()) {
            setError("El campo nombre esta vacío");
        }
        else {
            setError(null);
            try {
                const usuarioObj = { nombre: nombre, telefono: phone };
                await dbNSQL.collection("agenda").add(usuarioObj);
                const { docs } = await dbNSQL.collection("agenda").get();
                const newArray = docs.map((item: any) => ({ id: item.id, ...item.data() }));
                setUsers(newArray);
            } catch (e) {
                console.error(e);
            }
            setNombre("");
            setPhone("");
        }

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>formulario de Usuarios</h2>
                    <form className="form-group" onSubmit={mod ? setUpdate : setUsuarios}>
                        <input
                            className="form-control"
                            placeholder="Introduce el nombre"
                            type="text"
                            onChange={(e) => { setNombre(e.target.value) }}
                            value={nombre}
                        />
                        <input
                            className="form-control mt-3"
                            placeholder="Introduce el número"
                            type="text"
                            onChange={(e) => { setPhone(e.target.value) }}
                            value={phone}
                        />
                        <input
                            className={mod ? "btn btn-outline-info col-12 mt-3" : "btn btn-dark col-12 mt-3"}
                            value={mod ? "Actualizar" : "registrar"}
                            type="submit"
                        />
                    </form>
                    {
                        !error ? <span></span> : <div className="alert alert-danger mt-4 text-center" role="alert">{error}</div>
                    }
                </div>
                <div className="col">
                    <h2>Lista de usuarios</h2>
                    <ul className="list-group">
                        {
                            users.lenght !== 0 ? users.map((item: any) =>
                            (<li key={item.id} className="list-group-item d-flex justify-content-between" >
                                <span>{item.nombre} -- {item.telefono}</span>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-outline-danger btn-sm"
                                        onClick={(id) => { BorrarUser(item.id) }}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                        <span>Delete</span>
                                    </button>
                                    <button className="btn btn-outline-info btn-sm ms-3"
                                        onClick={(id) => { ActualizarUser(item.id) }}
                                    >
                                        <i className="bi bi-pencil-fill"></i>
                                        <span>Update</span>
                                    </button>
                                </div>
                            </li>)
                            )
                                : <span>lo siento no hay tareas que mostrar</span>
                        }
                    </ul>
                </div>


            </div>
        </div>
    )
}

export default Admin;
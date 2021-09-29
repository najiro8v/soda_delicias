import React, { useState, useEffect } from "react";
import { dbNSQL, storageBucket } from "../firebaseconfig";
const MenuComidaAdmin = () => {
    const [precio, setPrecio] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipo, setTipo] = useState("");
    const [modal, setModal] = useState(false);
    const [modalDispo, setModalDispo] = useState(false);
    const [img, setImg] = useState(null as any);
    const [id, setId] = useState(null as any);
    const [msgError, setMsgError] = useState("");
    const [change, setChange] = useState(false);
    const [image, setImage] = useState([] as any);

    const [modalTrash, setModalTrash] = useState(false);
    useEffect(() => {
        const readData = async () => {
            try {
                await dbNSQL.collection("Product").get().then((data: any) => {
                    let alpha = [] as any;
                    data.docs.map((doc: any) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        alpha.push(obj);
                        return "";
                    });
                    setImage(alpha);
                    return "";
                })
            } catch (error) {
                console.error(error);
            }
        }
        readData();
    }, [])
    useEffect(() => {
        const readData = async () => {
            try {
                await dbNSQL.collection("Product").get().then((data: any) => {
                    let alpha = [] as any;
                    data.docs.map((doc: any) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        alpha.push(obj);
                        return "";
                    });
                    setImage(alpha);
                    return "";
                })
            } catch (error) {
                console.error(error);
            }
        }
        readData();
    }, [change])

    const changeDispo = async (e: boolean) => {
        await dbNSQL.collection("Product").doc(id).update({ disponible: e }).then(async () => {
            setChange(!change)
            setModalDispo(false);
        });
    }

    const deleteProduct = async (e: any) => {
        e.preventDefault();
        if (isNaN(id)) {
            await dbNSQL.collection("Product").doc(id).delete().then(async () => {
                let storageRef = await storageBucket.ref('Product/' + id);
                await storageRef.delete().then(function () {
                    setChange(!change);
                    setModalTrash(false);
                    setId(null);
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                    console.error(error)
                });
            })
        }

    }

    const UpdateProduct = async (e: any) => {
        e.preventDefault();
        let pass = false;
        if (!precio.trim()) {
            setMsgError("El campo de precio se encuentra vacío");
        }
        else if (!nombre.trim()) {
            setMsgError("El campo de nombre se encuentra vacío");
        }
        else if (img == null) {
            setMsgError("El campo de imagen se encuentra vacío");
        }
        else {
            pass = true;
        }
        try {
            if (pass) {
                let file = img[0];

                setMsgError("");
                let Product = {
                    precio: precio,
                    name: nombre,
                };
                await dbNSQL.collection("Product").doc(id).update(Product).then(async () => {
                    if (file.change === undefined) {
                        let storageRef = await storageBucket.ref('Product/' + id);
                        await storageRef.put(file).then(async (data: any) => {

                            await storageRef.getDownloadURL().then((ulr: any) => {

                                dbNSQL.collection("Product").doc(id).update({
                                    ImgName: id,
                                    path: 'Product/' + id,
                                    url: ulr
                                });
                            });
                        });
                    }
                    setChange(!change);
                    setModal(false);
                });
            }
        } catch (e) { console.error(e); }

    }
    const modalDisponible = (
        <div style={{ position: "fixed", zIndex: 1, left: 0, top: 0, width: " 100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.6) " }} onClick={(e) => {
            setModalDispo(!modalDispo);
        }}>

            <div style={{ margin: "10% auto", width: "50%", padding: "1rem", backgroundColor: "rgba(255,255,255,0.9) " }} onClick={(e) => { e.stopPropagation(); }}>

                <p className="text-md-start text-md-center">Desea cambiar la disponibilidad de este producto</p>
                <div className="d-flex justify-content-around mt-4 flex-wrap" >
                    <button className="btn btn-success btn-sm" onClick={() => { changeDispo(true) }}>Disponible</button>
                    <button className="btn btn-warning btn-sm mt-1" onClick={() => { changeDispo(false) }}>No Disponible</button>
                </div>

            </div>
        </div>)
    const modalProduct = (
        <div style={{ position: "fixed", zIndex: 1, left: 0, top: 0, width: "100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.6) " }} onClick={(e) => {
            toggle();
        }}>
                <div style={{ margin: "15% auto", width: "70%", padding: "2.5rem", backgroundColor: "rgba(0,0,0,0.02) " }} onClick={(e) => { e.stopPropagation(); }}>
                    <form className="form-group" onSubmit={UpdateProduct}>

                        <div className="input-group">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-cash-coin"></i></button>
                            <input className="form-control" type="number" value={precio} placeholder={"Precio"} onChange={(e) => { setPrecio(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-card-text"></i></button>
                            <input className="form-control" type="text" value={nombre} placeholder={"Nombre del producto"} onChange={(e) => { setNombre(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-card-text"></i></button>
                            <input className="form-control" type="text" value={tipo} placeholder={"Tipo de Producto"} onChange={(e) => { setTipo(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <div className="input-group">
                                {
                                    img ? <button className="btn btn-success " id="btn-show-psw" type="button"><i className="bi bi-file-earmark-image"></i></button> :
                                        <button className="btn btn-secondary " type="button"><i className="bi bi-file-earmark-image"></i></button>
                                }
                                <label htmlFor="FormControlFile1" className="btn btn-info col">{img != null ? img[0] ? img[0].name : "Seleccione la foto del producto" : "Seleccione la foto del producto"}</label>

                            </div>
                            <input type="file" className="form-control-file  d-none" id="FormControlFile1" onChange={(e: any) => { e.target.files.length !== 0 ? setImg(e.target.files) : setImg(null); }} />
                        </div>
                        <input type="submit" className="form-control mt-3 btn btn-secondary" value="Guardar el producto" />
                        {msgError.length !== 0 ? <div className=" row alert alert-danger mt-5" role="alert">{msgError}</div> : <span></span>}
                    </form>
                </div>
        </div>
    )
    const modalProductTrash = (
        <div style={{ position: "fixed", zIndex: 1, left: 0, top: 0, width: " 100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.6) " }} onClick={(e) => {
            toggleTrash();
        }}>
            <div style={{ margin: "5% auto", width: "50%", padding: "5rem", backgroundColor: "rgba(0,0,0,0.6) " }} onClick={(e) => { e.stopPropagation(); }}>
                <p className="fs-1  text-white mb-5">¿Desea eliminar el producto?</p>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-warning " onClick={() => { setModalTrash(false) }}> Cancelar</button>
                    <button className="btn btn-danger" onClick={deleteProduct}> Borrar</button>
                </div>
            </div>
        </div>
    )
    const toggle = () => setModal(!modal);

    const toggleTrash = () => setModalTrash(!modalTrash);
    return (
        <div>

            {modal ? modalProduct : null}
            {modalDispo ? modalDisponible : null}
            {modalTrash ? modalProductTrash : null}
            <h3 className="text-center mb-3" >Menu</h3>
            {/*<label htmlFor="exampleFormControlFile1" className="btn btn-outline-info">Foto del Productos</label>
            <input type="file" className="form-control-file  d-none" id="exampleFormControlFile1" onChange={subirFoto} />*/}
            <div className="d-flex flex-wrap justify-content-center mt-5">
                {
                    image.map((infoImg: any) =>
                        <div key={infoImg.id} className="card mt-3 ms-3 col-xm-12 col-12 col-sm-4 col-md-3" >
                            <img src={infoImg.url} className="card-img-top" alt="Imagen del producto" />
                            <div className="card-body">
                                <h5 className="card-title" >{infoImg.name}</h5>
                                <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3">{infoImg.precio}</span></i></p>
                                <div className="d-flex justify-content-around flex-wrap" >
                                    <button className="btn btn-outline-secondary btn-sm " onClick={() => {
                                        setNombre(infoImg.name);
                                        setPrecio(infoImg.precio);
                                        setImg([{ name: "IMAGEN ORIGINAL", change: false }]);
                                        setId(infoImg.id);
                                        setTipo(infoImg.tipo);
                                        setMsgError("")
                                        toggle();
                                    }}>Editar</button>
                                    <button className={["btn btn-sm", infoImg.disponible ? "btn-outline-info" : "btn-outline-warning"].join(" ")} onClick={(e) => { setModalDispo(!modalDispo); setId(infoImg.id) }}>{infoImg.disponible ? "disponible" : "No disponible"} </button>
                                    <button className="btn btn-sm col" onClick={() => { setId(infoImg.id); toggleTrash() }}><i className="bi bi-trash-fill" /></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MenuComidaAdmin;
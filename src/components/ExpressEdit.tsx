import React, { useEffect, useState } from "react";
import { dbNSQL, storageBucket } from "../firebaseconfig";
import Express from "./Express";


const ExpressEdit = () => {
    const [imgs, setImgs] = useState([] as any);
    const [rest, setRest] = useState([] as any);
    const [precio, setPrecio] = useState("");
    const [nombre, setNombre] = useState("");
    const [modal, setModal] = useState(false);
    const [modalTrash, setModalTrash] = useState(false);
    const [img, setImg] = useState(null as any);
    const [id, setId] = useState(null as any);
    const [msgError, setMsgError] = useState("");
    const [change, setChange] = useState(false);
    useEffect(() => {
        const getCarousel = async () => {
            try {
                await dbNSQL.collection("Carrousel").get().then((doc: any) => {
                    let images = doc.docs.map((data: any) => {
                        let { name, precio, url } = data.data(), { id } = data;
                        return { name, precio, url, id };
                    })
                    setImgs(images);
                    let arrTemp = [];
                    for (let i = 0; i < 6 - images.length; i++) {
                        arrTemp.push(i)
                    }
                    setRest(arrTemp);
                });
            } catch (e) { console.error(e); }
        }
        getCarousel();
    }, [change,])

    const addCard = (e: any) => {
        let arrTemp = [...rest];
        arrTemp.push(rest.length === 0 ? rest.length + 1 : rest.length);
        setRest(arrTemp);
        return;
    }
    const deleteCard = (e: any) => {
        let arrTemp = [...rest];
        let newArr = [] as any;
        if (arrTemp.length - 1 > 0) {
            for (let i = 0; i < arrTemp.length - 1; i++) {
                //arrTemp.push(i);
                newArr.push(i);
            }
        }
        setRest(newArr);
        return;
    }

    const deleteProduct = async (e: any) => {
        e.preventDefault();

        if (isNaN(id)) {
            await dbNSQL.collection("Carrousel").doc(id).delete().then(async () => {
                let storageRef = await storageBucket.ref('Carrousel/' + id);
                await storageRef.delete().then(function () {
                    setChange(!change);
                    setModalTrash(false);
                    setId(null);
                    setImg(null);
                    setNombre("");
                    setPrecio("");
                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                    console.error(error)
                });
            })
        }

    }
    const updateProduct = async (e: any) => {
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
                if (!isNaN(id)) {
                    await dbNSQL.collection("Carrousel").add(Product).then(async (product: any) => {
                        let { id } = product;
                        let storageRef = await storageBucket.ref('Carrousel/' + id);
                        await storageRef.put(file).then(async (data: any) => {
                            await storageRef.getDownloadURL().then((ulr: any) => {
                                dbNSQL.collection("Carrousel").doc(id).update({
                                    ImgName: id,
                                    path: 'Carrousel' + id,
                                    url: ulr
                                }).then(() => {
                                    setImg(null);
                                    setNombre("");
                                    setPrecio("");
                                    setChange(!change);
                                    setModal(false);
                                    setId(null);

                                }
                                ).catch(() => {
                                    setId(null);
                                    setImg(null);
                                    setNombre("");
                                    setPrecio("");
                                    setChange(!change);
                                    setModal(false);
                                })

                            });
                        });
                    });
                }
                else {
                    await dbNSQL.collection("Carrousel").doc(id).update(Product).then(async () => {
                        if (file.change === undefined) {
                            let storageRef = await storageBucket.ref('Carrousel/' + id);
                            await storageRef.put(file).then(async (data: any) => {

                                await storageRef.getDownloadURL().then((ulr: any) => {

                                    dbNSQL.collection("Carrousel").doc(id).update({
                                        ImgName: id,
                                        path: 'Carrousel/' + id,
                                        url: ulr
                                    });
                                });
                            });
                        }
                        setImg(null);
                        setNombre("");
                        setPrecio("");
                        setChange(!change);
                        setId(null);
                        setModal(false);

                    });
                }
            }
        } catch (e) { console.error(e); }

    }
    const toggle = () => setModal(!modal);
    const toggleTrash = () => setModalTrash(!modalTrash);
    const modalProduct = (
        <div style={{ position: "fixed", zIndex: 1, left: 0, top: 0, width: " 100%", height: "100%", overflow: "auto", backgroundColor: "rgba(0,0,0,0.6) " }} onClick={(e) => {

            setImg(null);
            setNombre("");
            setPrecio("");
            toggle();
        }}>
            <div style={{ margin: "5% auto", width: "50%", padding: "5rem", }} onClick={(e) => { e.stopPropagation(); }}>
                <form className="form-group" onSubmit={updateProduct}>

                    <div className="input-group">
                        <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-cash-coin"></i></button>
                        <input className="form-control" type="number" value={precio} placeholder={"Precio"} onChange={(e) => { setPrecio(e.target.value) }} />
                    </div>

                    <div className="input-group mt-3">
                        <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-card-text"></i></button>
                        <input className="form-control" type="text" value={nombre} placeholder={"Nombre del producto"} onChange={(e) => { setNombre(e.target.value) }} />
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

    const CardExtra = (rest.map((infoImg: any) =>
        <div key={infoImg} className="card mt-3 ms-3 col-4 col-sm-3 col-md-2" >
            <label htmlFor="FormControlFile1" className="btn btn-outline-secondary" style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" fill="currentColor" className="bi bi-card-image card-img-top" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                </svg>
            </label>
            <div className="card-body">
                <p className="card-title d-flex align-items-center" ><i className="bi bi-card-text" /><label className=" ms-3" >Nombre</label></p>
                <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin" /> <label className=" ms-3" >Precio</label></p>
                <button className="btn btn-info btn-sm col-9" onClick={() => {
                    setId(id);
                    toggle();
                }}>Editar</button>
                <button className="btn  btn-sm col" onClick={deleteCard}><i className="bi bi-trash-fill" /></button>
            </div>
        </div>
    ))

    /*const expressDiv = (<div className="row">
        <div className="col"></div>
        <div className="col-lg-4 col-sm-9">
            <Express props={change} />
        </div>
        <div className="col"></div>
    </div>

    )*/
    return (
        <div className="container-fluid" >
            {modal ? modalProduct : null}
            {modalTrash ? modalProductTrash : null}
            <Express props={change} />
            <div className="row">
                <div className="d-flex flex-wrap justify-content-center mt-5">
                    {
                        imgs.map((infoImg: any) =>
                            <div key={infoImg.id} className="card mt-3 ms-3 col-4 col-sm-3 col-md-2" >
                                {infoImg.url ? infoImg.url.length !== 0 ?
                                    <img src={infoImg.url} alt="Imagen del producto" /> :
                                    <label htmlFor="FormControlFile1" className="btn btn-outline-secondary" style={{ cursor: "pointer" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" fill="currentColor" className="bi bi-card-image card-img-top" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                        </svg>
                                    </label> : <span></span>
                                }
                                <div className="card-body">
                                    <p className="card-title d-flex align-items-center" ><i className="bi bi-card-text" /><label className=" ms-3" >{infoImg.name ? infoImg.name : "Nombre"}</label></p>
                                    <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin" /> <label className=" ms-3" > {infoImg.precio ? infoImg.precio : "Precio"}</label></p>
                                    <button className="btn btn-info btn-sm col-9" onClick={() => {
                                        setId(infoImg.id);
                                        setNombre(infoImg.name);
                                        setPrecio(infoImg.precio);
                                        setImg([{ name: "IMAGEN ORIGINAL", change: false }]);
                                        toggle();
                                    }}>Editar</button>
                                    <button className="btn btn-sm col" onClick={() => {
                                        setId(infoImg.id);
                                        toggleTrash()
                                    }}><i className="bi bi-trash-fill" /></button>

                                </div>
                            </div>
                        )

                    }
                    {CardExtra}
                    <div className="card mt-3 ms-3 col-4 col-sm-3 col-md-2" style={{ cursor: "pointer" }} onClick={addCard}>
                        <div className="card-body d-flex align-items-center justify-content-center" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ExpressEdit;
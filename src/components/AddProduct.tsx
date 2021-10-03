
import React, { useState, useEffect } from "react";
import { storageBucket, dbNSQL } from "../firebaseconfig";
const AddProduct = () => {
    const [precio, setPrecio] = useState("");
    const [tipo, setTipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [tipos, setTipos] = useState([] as any);
    const [img, setImg] = useState(null as any);
    const [pathImg, setPathImg] = useState("");
    const [msgError, setMsgError] = useState("");
    useEffect(() => {
        const tipos = async () => {
            await dbNSQL.collection("Otros").doc("Tipos").get().then((e)=>{
                setTipos(Object.keys(e.data()||{}));
            })
        }
        tipos();
    }, [])

    const subirFoto = async (e: any) => {
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
                    disponible: true,
                    tipo: tipo,
                    precio: precio,
                    name: nombre,
                    ImgName: null,
                    path: null,
                    url: null
                }
                await dbNSQL.collection("Product").add(Product).then(async (product: any) => {
                    let { id } = product;
                    let storageRef = await storageBucket.ref('Product/' + id);
                    await storageRef.put(file).then(async (data: any) => {

                        await storageRef.getDownloadURL().then((ulr: any) => {

                            dbNSQL.collection("Product").doc(id).update({
                                ImgName: id,
                                path: 'Product/' + id,
                                url: ulr
                            });
                            setImg(null);
                            setNombre("");
                            setPrecio("");
                            setTipo("");
                            setPathImg("");
                        });
                    });
                });

            }
        } catch (e) { console.error(e); }

    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <form className="form-group" onSubmit={subirFoto}>
                        <h3 className="text-center mb-3" >Agregar un producto</h3>

                        <div className="input-group">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-cash-coin"></i></button>
                            <input className="form-control" type="number" min={0} value={precio} placeholder={"Precio"} onChange={(e) => { setPrecio(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-card-text"></i></button>
                            <input className="form-control" type="text" value={nombre} placeholder={"Nombre del producto"} onChange={(e) => { setNombre(e.target.value) }} />
                        </div>

                        <div className="input-group mt-3">
                            <button className="btn btn-secondary " id="btn-show-psw" type="button"><i className="bi bi-card-text"></i></button>
                            <select className="form-select" value={tipo} placeholder={"Tipo de Producto"} onChange={(e) => { setTipo(e.target.value) }} >
                            <option selected>Seleccione un tipo</option>
                                {
                                    tipos.map((e:any)=>(
                                        <option key={e}>{e}</option>)
                                    )
                                }
                            </select>
                        </div>

                        <div className="input-group mt-3">
                            <div className="input-group">
                                {
                                    img ? <button className="btn btn-success " id="btn-show-psw" type="button"><i className="bi bi-file-earmark-image"></i></button> :
                                        <button className="btn btn-outline-secondary disabled" type="button"><i className="bi bi-file-earmark-image"></i></button>
                                }
                                <label htmlFor="FormControlFile1" className="btn btn-outline-info col">{img != null ? img[0] ? img[0].name : "Seleccione la foto del producto" : "Seleccione la foto del producto"}</label>

                            </div>
                            <input type="file" className="form-control-file  d-none" id="FormControlFile1" value={pathImg} onChange={(e: any) => {if(e.target.files.length !== 0){setImg(e.target.files); setPathImg(e.target.value) } else{ setImg(null);setPathImg( e.target.value);}}} />
                        </div>
                        <input type="submit" className="form-control mt-3 btn btn-outline-secondary" value="Guardar el producto" />
                    </form>
                    {msgError.length !== 0 ? <div className=" row alert alert-danger mt-5" role="alert">{msgError}</div> : <span></span>}
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}
export default AddProduct;

/**
    <label htmlFor="exampleFormControlFile1" className="btn btn-outline-info">Foto del Productos</label>
            <input type="file" className="form-control-file  d-none" id="exampleFormControlFile1" onChange={subirFoto} />
            <div className="card" style={{ width: "18rem" }}>
                <img src={img} className="card-img-top" alt="Imagen del producto" />
                <div className="card-body">
                    <h5 className="card-title" >Nombre del producto</h5>
                    <p className="card-text"> 1000 <i className="bi bi-cash-coin"></i></p>
                </div>
            </div>
 */
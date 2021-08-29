
import React, { useState } from "react";
import { storageBucket, dbNSQL } from "../firebaseconfig";
const AddProduct = () => {
    const [precio, setPrecio] = useState("");
    const [nombre, setNombre] = useState("");
    const [img, setImg] = useState(null as any);
    const [msgError, setMsgError] = useState("");
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
            /*let imgRef =*/
            if (pass) {
                let file = img[0];
                setMsgError("");
                let storageRef = await storageBucket.ref('test/' + file.name);
                await storageRef.put(file).then((data: any) => {
                    storageRef.getDownloadURL().then((ulr: any) => {
                        let Product = {
                            disponible: true,
                            tipo: null,
                            precio: precio,
                            name: nombre,
                            ImgName: file.name,
                            path: 'test/' + file.name,
                            url: ulr
                        }
                        dbNSQL.collection("img").add(Product);
                        setImg(null);
                        setNombre("");
                        setPrecio("");
                    });
                })
            }
        } catch (e) { console.error(e); }

    }
    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>
                <div className="col">
                    <form className="form-group" onSubmit={subirFoto}>
                        <h3 className="text-center mb-3" >Agregar un producto</h3>

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
                                        <button className="btn btn-outline-secondary disabled" type="button"><i className="bi bi-file-earmark-image"></i></button>
                                }
                                <label htmlFor="FormControlFile1" className="btn btn-outline-info col">{img != null ? img[0] ? img[0].name : "Seleccione la foto del producto" : "Seleccione la foto del producto"}</label>

                            </div>
                            <input type="file" className="form-control-file  d-none" id="FormControlFile1" onChange={(e: any) => { e.target.files.length !== 0 ? setImg(e.target.files) : setImg(null); }} />
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
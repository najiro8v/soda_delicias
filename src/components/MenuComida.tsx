import React, { useState, useEffect } from "react";
import { dbNSQL } from "../firebaseconfig";
const MenuComida = () => {
    const [img, setImg] = useState([] as any);
    useEffect(() => {
        const readData = async () => {
            try {
                await dbNSQL.collection("img").get().then((data: any) => {
                    let alpha = [] as any;
                    data.docs.map((doc: any) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        alpha.push(obj);
                        return "";
                    });
                    setImg(alpha);
                    return "";
                })
            } catch (error) {
                console.error(error);
            }
        }
        readData();
    }, [])

    return (
        <div>
            <h3 className="text-center mb-3" >Menu</h3>
            {/*<label htmlFor="exampleFormControlFile1" className="btn btn-outline-info">Foto del Productos</label>
            <input type="file" className="form-control-file  d-none" id="exampleFormControlFile1" onChange={subirFoto} />*/}
            <div className="d-flex flex-wrap justify-content-center mt-5">
                {
                    img.map((infoImg: any) =>
                        <div key={infoImg.id} className="card mt-3 ms-3" style={{ width: "10rem" }}>
                            <img src={infoImg.url} className="card-img-top" alt="Imagen del producto" />
                            <div className="card-body">
                                <h5 className="card-title" >{infoImg.name}</h5>
                                <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3">{infoImg.precio}</span></i></p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MenuComida;
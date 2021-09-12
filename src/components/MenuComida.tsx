import React, { useState, useEffect } from "react";
import { dbNSQL } from "../firebaseconfig";
import Express from "./Express";
const MenuComida = () => {
    const [img, setImg] = useState([] as any);
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
                    alpha.sort((a: any, b: any) => {
                        if (a.tipo > b.tipo) {
                            return 1;
                        }
                        if (a.tipo < b.tipo) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })
                    let lista = alpha.filter((card:any)=>card.disponible)
                    setImg(lista);
                    return "";
                })
            } catch (error) {
                console.error(error);
            }
        }
        readData();
    }, [])

    return (
        <div className="container-fluid">
            {/*<h3 className="text-center mb-3" >Menu</h3>*/}
            {/*<label htmlFor="exampleFormControlFile1" className="btn btn-outline-info">Foto del Productos</label>
            <input type="file" className="form-control-file  d-none" id="exampleFormControlFile1" onChange={subirFoto} />*/}
            <div className="row-3 d-flex justify-content-center">
                <div className="col"></div>
                <div className="col-md-7 col-lg-7 col-sm-8 ">
                    <Express/>
                </div>
                <div className="col"></div>

            </div>
            <div className="d-flex flex-wrap justify-content-center mt-5 row">
                {
                    img.map((infoImg: any) =>
                        <div key={infoImg.id} className="card   mt-3 ms-3 col-xm-12 col-12 col-sm-4 col-md-3" >
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
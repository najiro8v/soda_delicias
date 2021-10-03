import React, { useState, useEffect, Fragment } from "react";
import { dbNSQL } from "../firebaseconfig";
import Express from "./Express";
const MenuComida = () => {
    const [img, setImg] = useState([] as any);
    const [openModal, setOpenModal] = useState([] as any);
    useEffect(() => {

        const readData = async () => {
            try {

                const TiposO = await dbNSQL.collection("Otros").doc("Tipos").get().then((e) => {
                    return e.data();
                })
                await dbNSQL.collection("Product").get().then(async (data: any) => {
                    let alpha = [] as any, Ordenado = [] as any, listaModales = [] as any;
                    let Titulos = { ...TiposO };
                    data.docs.map((doc: any) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        alpha.push(obj);
                        return "";
                    });
                    let lista = alpha.filter((card: any) => card.disponible);
                    lista.forEach((e: any) => {
                        console.log(e.tipo+"-"+e.name)
                        Titulos[e.tipo] = [...Titulos[e.tipo], e];
                        

                    });
                    for (const propiedad in Titulos) {
                        if (Titulos[propiedad].length > 1) {
                            if (Titulos[propiedad].length >= 3) listaModales.push(...[`${propiedad}`, false]);
                            Ordenado.push(Titulos[propiedad]);
                        }
                    }
                    Ordenado.sort((a: any, b: any) => {
                        if (a[0] > b[0]) {
                            return 1;
                        }
                        else if (a[0] < b[0]) {
                            return -1;
                        }
                        return 0;
                    }).map((e: any) => e.shift())
                    setImg(Ordenado);
                    setOpenModal(listaModales);
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

            <Express />

            <div className=" col-12">
                {
                    img.map((group: any) => {
                        return (<div key={group[0].tipo} className="container-fluid d-flex justify-content-center flex-wrap mt-5">
                            <p className="h5">{group[0].tipo}</p>
                            <div className="container-fluid  d-flex flex-wrap justify-content-center ">
                                {group.map((infoImg: any, index: number) => index <= 3 ? (<div key={infoImg.id} className="card ms-3 mt-3 col-12 col-sm-3 col-md-2" >
                                    <img src={infoImg.url} className="card-img-top mt-1" alt="Imagen del producto" />
                                    <div className="card-body">
                                        <h5 className="card-title" >{infoImg.name}</h5>
                                        <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3">{infoImg.precio}</span></i></p>
                                    </div>
                                </div>) :
                                    !(openModal[openModal.indexOf(group[0].tipo) + 1]) && (index > 3 && 4 >= index) ? (
                                        <div key={Math.random()} className="card ms-3 mt-3 col-md-2 align-self-end card-small " style={{ cursor: "pointer" }} onClick={(e) => { const cloneArray = [...openModal]; cloneArray[cloneArray.indexOf(group[0].tipo) + 1] = (cloneArray[cloneArray.indexOf(group[0].tipo) + 1]) ? false : true; setOpenModal(cloneArray) }}>
                                            <div className="card-body py-1">
                                                <h5 className="card-title text-center stretched-link p-0" ><i className="bi bi-three-dots p-0"></i></h5>
                                            </div>
                                        </div>) :
                                        (openModal[openModal.indexOf(group[0].tipo) + 1]) ? index + 1 === group.length ?
                                            (<Fragment key={Math.random()}>
                                                <div key={infoImg.id} className="card ms-3 mt-3 col-12 col-sm-3 col-md-2" >
                                                    <img src={infoImg.url} className="card-img-top mt-1" alt="Imagen del producto" />
                                                    <div className="card-body">
                                                        <h5 className="card-title" >{infoImg.name}</h5>
                                                        <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3">{infoImg.precio}</span></i></p>
                                                    </div>
                                                </div>
                                                <div key={Math.random()} className="card ms-3 mt-3 col-md-2 align-self-end card-small" style={{ cursor: "pointer" }} onClick={(e) => { const cloneArray = [...openModal]; cloneArray[cloneArray.indexOf(group[0].tipo) + 1] = (cloneArray[cloneArray.indexOf(group[0].tipo) + 1]) ? false : true; setOpenModal(cloneArray) }}>
                                                    <div className="card-body  py-1">
                                                        <h5 className="card-title text-center stretched-link" ><i className="bi bi-arrow-bar-left d-none d-md-block"></i><i className="bi bi-arrow-bar-up d-block d-md-none"></i></h5>
                                                    </div>
                                                </div>
                                            </Fragment>)
                                            : (
                                                <div key={infoImg.id} className="card ms-3 mt-3 col-12 col-sm-3 col-md-2"  >
                                                    <img src={infoImg.url} className="card-img-top mt-1" alt="Imagen del producto" />
                                                    <div className="card-body">
                                                        <h5 className="card-title" >{infoImg.name}</h5>
                                                        <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3">{infoImg.precio}</span></i></p>
                                                    </div>
                                                </div>)
                                            : null

                                )}
                            </div></div>)
                    })
                }
            </div>
        </div>
    )
}

export default MenuComida;
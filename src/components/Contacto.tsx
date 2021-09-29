import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";

const Contacto = () => {
    const [img, setImg] = useState([] as any)
    
    useEffect(() => {
        const fotos = async () => {
            await dbNSQL.collection("Otros").get().then((data: any) => {
                let usuario = data.docs.map((element: any) => { let { url } = element.data(); return url; });

                setImg(usuario);

            })


        }
        fotos();
    }, [])
    return (
        <div>
            <div>
                <div className="container-fluid col-12">
                    <p className="h5  text-center text-white py-1 pe-3" style={{ backgroundColor: "#fbad31" }}>
                        Te esperamos en Pavas de Martes a Domingo
                    </p>
                </div>


                <div className="d-flex flex-wrap m-2 text-white" style={{ backgroundColor: "#d71924dd" }}>

                    <div className="col">

                        <div className="ratio ratio-16x9" >
                            {img[0] ? <img src={img[0]} alt="imagen" />
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-card-image card-img-top " viewBox="0 0 16 16" >
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                </svg>}
                        </div>

                    </div>

                    <div className="col-12 col-md-6 m-1">
                        <p className="d-block d-sm-none h6 m-0">
                            <i className="bi bi-map me-3"></i>
                            Nuestra sucursal principal de comida rápida está frente a la estación de la polícia de Lomas, de la entrada la iglesia a mano izquierda 200mt Norte, 50mt Oeste.
                        </p>
                        <p className="d-none d-sm-block d-md-none h3 m-0">
                            <i className="bi bi-map me-3"></i>
                            Nuestra sucursal principal de comida rápida está frente a la estación de la polícia de Lomas, de la entrada la iglesia a mano izquierda 200mt Norte, 50mt Oeste.
                        </p>
                        <p className="d-none d-md-block h2 m-0">
                            <i className="bi bi-map me-3"></i>
                            Nuestra sucursal principal de comida rápida está frente a la estación de la polícia de Lomas, de la entrada la iglesia a mano izquierda 200mt Norte, 50mt Oeste.
                        </p>

                    </div>

                </div>





                <div className="d-flex flex-wrap m-2 text-white" style={{ backgroundColor: "#d71924dd" }}>
                    <div className="col ">
                        <div className="ratio ratio-16x9" >

                            {img[2] ? <img src={img[2]} alt="imagen" />
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-card-image card-img-top " viewBox="0 0 16 16" >
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                </svg>}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 m-1">
                        <p className="d-block d-sm-none h6 m-0">
                            <i className="bi bi-facebook me-3"></i>

                            Puedes encontrarnos en Facebook como <b>"Soda las Delicias"</b>
                        </p>
                        <p className="d-none d-sm-block  d-md-none h3 m-0">
                            <i className="bi bi-facebook me-3"></i>

                            Puedes encontrarnos en Facebook como <b>"Soda las Delicias"</b>
                        </p>
                        <p className="d-none  d-md-block h2 m-0">
                            <i className="bi bi-facebook me-3"></i>

                            Puedes encontrarnos en Facebook como <b>"Soda las Delicias"</b>
                        </p>
                    </div>


                </div>
                <div className="d-flex flex-wrap m-2 text-white" style={{ backgroundColor: "#d71924dd" }}>
                    <div className="col ">
                        <div className="ratio ratio-16x9" >
                            {img[1] ? <img src={img[1]} alt={"bi bi-facebook"} />
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-card-image card-img-top " viewBox="0 0 16 16" >
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                </svg>}
                        </div>
                    </div>
                    <div className="col-12 col-md-6 m-1">
                        <p className="d-block d-sm-none h6 m-0">
                            Puedes pedir tu pedido al número <b>63604906</b> o enviarnos un mensaje a nuestro whatsapp
                            <a title="Whatsapp" href="https://api.whatsapp.com/send?phone=50663604906" rel="noreferrer" target="_blank" className=" ms-2 pe-auto btn bg-success btn-small"  >
                            <i className="bi bi-whatsapp text-white "></i>
                        </a>
                        </p>
                        <p className="d-none d-sm-block  d-md-none h3 m-0">
                            Puedes pedir tu pedido al número <b>63604906</b> o enviarnos un mensaje a nuestro whatsapp
                            <a title="Whatsapp" href="https://api.whatsapp.com/send?phone=50663604906" rel="noreferrer" target="_blank" className=" ms-2 pe-auto  btn bg-success">
                            <i className="bi bi-whatsapp text-white "></i>
                        </a>
                        </p>
                        <p className="d-none d-md-block h2 m-0">
                            Puedes pedir tu pedido al número <b>63604906</b> o enviarnos un mensaje a nuestro whatsapp
                            <a title="Whatsapp" href="https://api.whatsapp.com/send?phone=50663604906" rel="noreferrer" target="_blank" className=" ms-2 pe-auto btn bg-success">
                            <i className="bi bi-whatsapp text-white "></i>
                        </a>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacto;
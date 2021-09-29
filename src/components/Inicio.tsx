import React from "react";
import Express from "./Express"
import Horario from "./elemens/Horario";
const Inicio = () => {
    return (
        <div className="container-fluid">
            <Express />

            <div className="container-fluid d-flex flex-wrap mt-3">
                <div className="col-12 col-sm-12 col-md-8 text-center" >
                    <h4>Donde Estamos</h4>
                </div>
            </div>
            <div className="container-fluid d-flex flex-wrap mt-3 align-items-center">
                <iframe title="Mapa"
                    non-passive="true"
                    className="col"
                    id="google-maps"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245.60997606553337!2d-84.1548252!3d9.9539474!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0fbe68604d587%3A0x3e4bbf58b85b2de3!2sSoda%20Las%20Delicias!5e0!3m2!1ses-419!2scr!4v1632544813392!5m2!1ses-419!2scr"
                    style={{ border: 0, height: "22em" }}
                    loading="lazy">
                </iframe>

                <div className="d-flex justify-content-end col-12 col-sm-12 col-md-4">
                    <Horario />
                </div>
            </div>
        </div>
    )
}
export default Inicio;

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
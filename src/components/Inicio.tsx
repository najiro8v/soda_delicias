import React from "react";
import Express from "./Express"
import Horario from "./elemens/Horario";
const Inicio = () => {
    
    return (
        <div className="container-fluid">
            <div>
            <i className="bi bi-calendar-week"></i>
            </div>
            <Express/>
            <Horario/>
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
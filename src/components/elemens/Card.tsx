import React from "react";

const Card = (props: any) => {
    let { compras, editCompras,infoImg } = props;
    const AddCarrito = (id: "") => {
        compras.push(id)
        editCompras(compras);
    }
    return (
        <div key={infoImg.id} className="card ms-3 mt-3 col-12 col-sm-3 col-md-2" >
            <img src={infoImg.url} className="card-img-top mt-1" alt="Imagen del producto" title="prueva" />
            <div className="card-body">
                <h5 className="card-title" >{infoImg.name}</h5>
                <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3 me-3">{infoImg.precio}</span></i><i role="button" className=" bi bi-cart-plus-fill" onClick={() => { AddCarrito(infoImg.id) }}></i></p>
            </div>
        </div>
    )
}

export default Card;
import React, { useState} from "react";

const Card = (props: any) => {
    const [productos, setProductos] = useState([] as any);
    const [id, setId] = useState(null as any);

    let { infoImg } = props;
    return (
        <div key={infoImg.id} className="card ms-3 mt-3 col-12 col-sm-3 col-md-2" >
            <img src={infoImg.url} className="card-img-top mt-1" alt="Imagen del producto" title="prueva" />
            <div className="card-body">
                <h5 className="card-title" >{infoImg.name}</h5>
                <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3 me-3">{infoImg.precio}</span></i><i role="button" className=" bi bi-cart-plus-fill" onClick={(e) => {
                    setId(infoImg.id); let temp = productos[0] == null && productos.length === 1 ? [id] : [...productos, id];
                    console.log(temp)
                    setProductos(temp)
                }}></i></p>
            </div>
        </div>
    )
}

export default Card;
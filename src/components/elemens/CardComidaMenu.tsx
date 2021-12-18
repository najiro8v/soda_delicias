import React from "react";

const CardComidaMenu = (props:any) => {

    let { compras, editCompras, data } = props;
    function eliminar() {
        let arrayTemp = [...compras];
        const GetIndex = (element: any) => element === data.id;
        let pos = arrayTemp.findIndex(GetIndex);
        if (pos !== -1) {
            arrayTemp.splice(pos, 1);
        }
        editCompras(arrayTemp);
    }
    function agregar() {
        let arrayTemp = [...compras];
        arrayTemp.push(data.id)
        editCompras(arrayTemp);
    }
    return (
        <div>
            <div className="card ms-3 mt-3 col-12 " >
                <div className="card-body d-flex justify-content-around">
                    <div className=" d-flex justify-content-start">
                        <img src={data.url} className="w-25 me-3" alt="Imagen del producto" title="prueva" />
                        <div>
                            <h5 className="card-title" >{data.name}</h5>
                            <h5 className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3 me-3">{data.precio * data.canti} ₡ ({data.canti})</span></i></h5>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-around flex-column">
                        <button className="btn btn-success" onClick={agregar}><i className="bi bi-plus"></i></button>
                        <button className="btn btn-warning" onClick={eliminar}><i className="bi bi-trash"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardComidaMenu;
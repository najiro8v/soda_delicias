import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";
import CardComida from "./elemens/CardComida"
import { useHistory } from "react-router-dom";
const Carrito = (props: any) => {
    let { compras, editCompras } = props
    const [img, setImg] = useState([] as any);
    const [express, setExpress] = useState(false);
    const [suma, setSuma] = useState(0);
    const history = useHistory();
    useEffect(() => {
        const repetidos = () => {
            let arrayPedidos = [...compras];
            let arraytempo = [], arrayId = [];
            for (let i = 0; i < arrayPedidos.length; i++) {
                let miVariable = { code: "", canti: 0 };
                for (let j = 0; j < arrayPedidos.length; j++) {
                    if (arrayPedidos[i] === arrayPedidos[j]
                        && arrayPedidos[j] != null
                        && arrayPedidos[i] != null
                        && i !== j) {
                        miVariable.code = arrayPedidos[i];
                        miVariable.canti += 1;
                        arrayPedidos[j] = null;
                    }
                    else {
                        continue
                    }
                }
                if (miVariable.code != null && miVariable.code !== "") {
                    arraytempo.push(miVariable)
                    arrayId.push(miVariable.code)
                }
            }
            return { arraytempo, arrayId };
        }
        const readData = async () => {
            try {
                let { arraytempo, arrayId } = repetidos();
                let sumaTotal = 0;
                await dbNSQL.collection("Product").get().then(async (data: any) => {
                    let alpha = [] as any, Ordenado = [] as any;
                    data.docs.map((doc: any) => {
                        let obj = doc.data();
                        obj.id = doc.id;
                        if (arrayId.includes(doc.id)) {
                            obj.canti = arraytempo[arrayId.indexOf(doc.id)].canti;
                            alpha.push(obj);
                            sumaTotal += (parseFloat(obj.canti)) * (parseFloat(obj.precio));
                        }
                        return "";
                    });
                    Ordenado.sort((a: any, b: any) => {
                        if (a[0] > b[0]) {
                            return 1;
                        }
                        else if (a[0] < b[0]) {
                            return -1;
                        }
                        return 0;
                    }).map((e: any) => e.shift())
                    setImg(alpha);
                    setSuma(sumaTotal)
                    return "";
                })
            } catch (error) {
                console.error(error);
            }
        }
        readData();
    }, [compras])
    const mensajePedido = () => {
        let text = "Pedido" + (express ? " con express" : " para recoger en el local"), jump = "%0A";
        img.forEach((carta: any) => {
            text += jump + "- " + carta.canti + " " + carta.name;
        });
        text += jump +(express?"precio a pagar _sin express incluido_":"precio a pagar")+ " : *"+suma+".00* ₡";
        
        window.open("https://api.whatsapp.com/send?phone=50662002879&text=" + text, "_blank");
    }
    return (
        <div className="container-fluid">
            <h3 className="text-center">Mi Carrito</h3>
            <div>
                {
                    img.map((carta: any, index: 1) => (
                        <CardComida key={index} compras={compras} editCompras={editCompras} data={carta} indice={index}>
                        </CardComida>
                    ))
                }
            </div>
            {suma <= 0 ? <div style={{ height: "60vh" }} className="d-flex align-items-end justify-content-end">
                <div><button className="btn btn-dark" onClick={() => { history.push("/menu"); }}>
                    Comprar productos
                </button></div>
            </div> :
                <div className="d-flex justify-content-end mt-3 align-items-center">
                    <div className="form-check form-switch d-flex align-items-center">
                        <input className="form-check-input " type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={()=>{setExpress(!express)}}/>
                        <label className=" me-3 ms-3 h1 form-check-label" htmlFor="flexSwitchCheckDefault"><i className={"bi bi-bicycle text-"+(express?"dark":"secondary")}></i></label>
                    </div>
                    <h3 className="ms-5 d-flex align-items-center"><i className="bi bi-cash-coin"> Total :<span className="ms-2 me-3">{suma}.00 ₡</span></i></h3>
                    <button className="btn btn-dark" onClick={mensajePedido}> <i className="bi bi-cart4"></i></button>
                </div>
            }
        </div>
    )
}

export default Carrito;
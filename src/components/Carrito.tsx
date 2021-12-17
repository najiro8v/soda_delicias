import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";
import CardComida from "./elemens/CardComida"
const Carrito = (props: any) => {
    let { compras, editCompras } = props
    const [img, setImg] = useState([] as any);
    const [suma, setSuma] = useState(0);
    
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
            <div className="d-flex justify-content-end">
                <h3>Total {suma}</h3>
            </div>
        </div>
    )
}

export default Carrito;
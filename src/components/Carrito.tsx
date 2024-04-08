import React, { useEffect, useState } from "react";
import CardComida from "./elemens/CardComida";
import { useHistory } from "react-router-dom";
const Carrito = (props: any) => {
  let { compras, editCompras } = props;
  const [img, setImg] = useState([] as any);
  const [express, setExpress] = useState(false);
  const [suma, setSuma] = useState(0);
  const history = useHistory();
  useEffect(() => {
    const repetidos = () => {
      let arrayPedidos = [...props.compras];
      let arrayTemp = [] as any,
        arrayId = [] as any;
      for (let i = 0; i < props.compras.length; i++) {
        let ordenTemp = arrayPedidos.shift();
        const posOrdenTemp = arrayId.findIndex(
          (element: any) => element === ordenTemp
        );
        if (posOrdenTemp !== -1) {
          arrayTemp[posOrdenTemp].canti += 1;
        } else {
          arrayTemp.push({ code: ordenTemp, canti: 1 });
          arrayId.push(ordenTemp);
        }
      }
      return { arrayTemp, arrayId };
    };
    const readData = async () => {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        const { arrayTemp, arrayId } = repetidos();
        const raw = JSON.stringify({ arrayTemp, arrayId });
        await fetch(`${process.env.REACT_APP_IP_API}/api/products/carshop`, {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) => {
            let { listProducts, totalCost } = result;
            setImg(listProducts);
            setSuma(totalCost);
          })
          .catch((error) => console.log("error", error));
      } catch (error) {
        console.error(error);
      }
    };
    readData();
  }, [props.compras]);

  const mensajePedido = () => {
    let text =
        "Pedido" + (express ? " con express" : " para recoger en el local"),
      jump = "%0A";
    img.forEach((carta: any) => {
      text += jump + "- " + carta.canti + " " + carta.name;
    });
    text +=
      jump +
      (express ? "precio a pagar _sin express incluido_" : "precio a pagar") +
      " : *" +
      suma +
      ".00* ₡";
    window.open(
      "https://api.whatsapp.com/send?phone=50663604906&text=" + text,
      "_blank"
    );
  };
  return (
    <div className="container-fluid">
      <h3 className="text-center">Mi Carrito</h3>
      <div>
        {img.map((carta: any, index: 1) => (
          <CardComida
            key={index}
            compras={compras}
            editCompras={editCompras}
            data={carta}
            indice={index}
          ></CardComida>
        ))}
      </div>
      {suma <= 0 ? (
        <div
          style={{ height: "60vh" }}
          className="d-flex align-items-end justify-content-end"
        >
          <div>
            <button
              className="btn btn-dark"
              onClick={() => {
                history.push("/menu");
              }}
            >
              Comprar productos
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-end mt-3 align-items-center flex-wrap flex-column flex-md-row">
          <div className="form-check form-switch d-flex align-items-center">
            <input
              className="form-check-input "
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onClick={() => {
                setExpress(!express);
              }}
            />
            <label
              className=" me-3 ms-3 h1 form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              <i
                className={
                  "bi bi-bicycle text-" + (express ? "dark" : "secondary")
                }
              ></i>
            </label>
          </div>
          <h3 className="mt-3 md-mt-0 ms-5 d-flex align-items-center">
            <i className="bi bi-cash-coin">
              {" "}
              Total :<span className="ms-2 me-3">{suma}.00 ₡</span>
            </i>
          </h3>
          <button className="mt-3 md-mt-0 btn btn-dark" onClick={mensajePedido}>
            {" "}
            <i className="bi bi-cart4"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;

import React from "react";
import Yourpng from "../img/logo.png";
const Footer = () => {
    return (
        <div
            style={{ backgroundColor: "#fbad31", padding: "0.5rem",}}
            className=" d-flex flex-wrap align-items-center justify-content-around container-fluid mt-5">
            <div className="col-4">
                <h4 className="text-white" >© Soda las Delicias</h4>
            </div>
            <div className="col d-flex justify-content-center">
                <img src={Yourpng} alt="Soda las Delicias" />

            </div>
            <div className="d-flex justify-content-around col-4">
                <a href="https://www.facebook.com/SodaDeliciasPavas" rel="noreferrer" className="pe-auto" target="_blank">
                    <h2>
                        <i className="bi bi-facebook text-white text-lg"></i>
                    </h2>
                </a>
                <a href="https://api.whatsapp.com/send?phone=50663604906" rel="noreferrer" target="_blank" className="pe-auto">
                    <h2>
                        <i className="bi bi-whatsapp text-white"></i>
                    </h2>
                </a>
                <a href="https://goo.gl/maps/frCAGCWhmnnpCP7d9" rel="noreferrer" target="_blank" className="pe-auto">
                    <h2>
                        <i className="bi bi-geo-alt text-white"></i>
                    </h2>
                </a>
            </div>


        </div >
    )
}

export default Footer;
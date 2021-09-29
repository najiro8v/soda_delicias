import React from "react";
import Yourpng from "../img/logo.png";
const Footer = () => {
    return (
        <div
            style={{ backgroundColor: "#fbad31", padding: "0.5rem",bottom:0,right:0,left:0,position:"fixed"}}
            className=" d-flex flex-wrap align-items-center justify-content-around container-fluid mt-10">
            <div className="col-12 col-sm-4">
                <h4 className="text-white" >© Soda las Delicias</h4>
            </div>
            <div className="col d-flex justify-content-center">
                <img src={Yourpng} alt="Soda las Delicias" />

            </div>
            <div className="d-flex flex-wrap justify-content-around col-12 col-sm-4">
                <a title="Facebook" href="https://www.facebook.com/SodaDeliciasPavas" rel="noreferrer" className="pe-auto" target="_blank">
                    <h2>
                        <i className="bi bi-facebook text-white text-lg"></i>
                    </h2>
                </a>
                <a title="Whatsapp" href="https://api.whatsapp.com/send?phone=50663604906" rel="noreferrer" target="_blank" className="pe-auto">
                    <h2>
                        <i className="bi bi-whatsapp text-white"></i>
                    </h2>
                </a>
                <a title="Cómo llegar " href="https://goo.gl/maps/frCAGCWhmnnpCP7d9" rel="noreferrer" target="_blank" className="pe-auto">
                    <h2>
                        <i className="bi bi-geo-alt text-white"></i>
                    </h2>
                </a>
            </div>


        </div >
    )
}

export default Footer;
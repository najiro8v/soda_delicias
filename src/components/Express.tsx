import React from "react";
import logo2 from "../img/comida3.png";
import logo3 from "../img/comida4.png";
const Express = () => {

    return (
        <div className="container" >
            <div id="carouselExampleSlidesOnly" className="carousel slide shadow" data-bs-ride="carousel" >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img
                            src={logo2}
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item">
                        <img
                            src={logo3}
                            className="d-block w-100"
                            alt="..."
                        />
                    </div>
                </div>
                <button className="carousel-control-prev" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </button>
                <button className="carousel-control-next" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </button>
            </div >
        </div >
    )
}

export default Express;
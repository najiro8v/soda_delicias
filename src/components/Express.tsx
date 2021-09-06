import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";
const Express = () => {
    const [imgs, setImgs] = useState([] as any);
    const [imgP, setImgP] = useState({ name: "", precio: "", url: "", id: "" });
    useEffect(() => {
        const getCarousel = async () => {
            try {
                await dbNSQL.collection("Product").get().then((doc: any) => {
                    let images = doc.docs.map((data: any) => {
                        let { name, precio, url } = data.data(), { id } = data;
                        return { name, precio, url, id };
                    })

                    setImgP(images.pop());
                    setImgs(images);
                });
            } catch (e) { console.error(e); }
        }
        getCarousel();
    }, [])
    return (
        <div className="container" >
            <div className="row">
                <div id="carouselExampleSlidesOnly" className="carousel slide carousel-dark" data-bs-ride="carousel" >
                    <div className="carousel-inner">
                        <div className="carousel-item active" >
                            <img
                                src={imgP.url}
                                className="d-block  w-100"
                                alt={imgP.name}
                            />
                            <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: "#22222233" }} >
                                <h3 style={{ color: "#eee" }}>{imgP.name}</h3>
                                <h4 style={{ color: "#eee" }}>{imgP.precio}</h4>
                            </div>
                        </div>
                        {
                            imgs.map((img: any) => (
                                <div className="carousel-item " key={img.id}>
                                    <img
                                        src={img.url}
                                        className="d-block  w-100"
                                        alt="..."
                                    />
                                    <div className="carousel-caption d-none d-md-block" style={{ backgroundColor: "#22222233" }}>
                                        <h3 style={{ color: "#eee" }}>{img.name}</h3>
                                        <h4 style={{ color: "#eee" }}>{img.precio}</h4>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button className="carousel-control-prev" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev" style={{ color: "#222" }}>
                        <span className="carousel-control-prev-icon" aria-hidden="true" style={{ color: "#222" }}></span>
                        <span className="sr-only" style={{ color: "#222" }}></span>
                    </button>
                    <button className="carousel-control-next" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next" >
                        <span className="carousel-control-next-icon" aria-hidden="true" style={{ color: "#222" }}></span>
                        <span className="sr-only"></span>
                    </button>
                </div >
            </div>

        </div >
    )
}

export default Express;
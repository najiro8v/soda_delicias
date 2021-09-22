import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";
const Express = (props?: any) => {
    const [imgs, setImgs] = useState([] as any);
    const [imgP, setImgP] = useState({ name: "", precio: "", url: "", id: "" });
    useEffect(() => {
        const getCarousel = async () => {
            try {
                await dbNSQL.collection("Carrousel").get().then((doc: any) => {
                    let images = doc.docs.map((data: any) => {
                        let { name, precio, url } = data.data(), { id } = data;
                        return { name, precio, url, id };
                    })
                    if (images) {
                        setImgP(images.pop());
                        setImgs(images);
                    }
                    else {
                    }
                });
            } catch (e) { console.error(e); }
        }
        getCarousel();
    }, [props,])
    return (
        <div className="container-fluid m-0" >
            <div className="row">
                <div id="carouselExampleSlidesOnly" className="carousel slide carousel-dark" data-bs-ride="carousel" >
                    <div className="carousel-inner">
                        <div className="carousel-item active" >
                            {imgP ? <img
                                src={imgP.url}
                                className="d-block  w-100"
                                alt={imgP.name}
                            /> :
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-card-image card-img-top " viewBox="0 0 16 16">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                </svg>
                            }
                            {imgP ? <div className="carousel-caption d-block" style={{ backgroundColor: "#22222233" }} >
                                <h3 className="d-block" style={{ color: "#eee" }}>{imgP.name}</h3>
                                <h4 className="d-none d-md-block" style={{ color: "#eee" }}>{imgP.precio}</h4>
                            </div> : null}
                        </div>

                        {
                            imgs.map((img: any) => (
                                <div className="carousel-item " key={img.id}>
                                    {img.url.length !== 0 ? <img
                                        src={img.url}
                                        className="d-block  w-100"
                                        alt="..."
                                    />
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-card-image card-img-top d-block  w-100" viewBox="0 0 16 16">
                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                        </svg>
                                    }
                                    {img.name.length !== 0 || img.precio.length !== 0 ?
                                        <div className="carousel-caption  d-sm-block d-block d-md-block  d-sm-block" style={{ backgroundColor: "#22222233" }}>
                                            <h3 className="d-block" style={{ color: "#eee" }}>{img.name}</h3>
                                            <h4 className="d-none d-md-block "style={{ color: "#eee" }}>{img.precio}</h4>
                                        </div> : null}
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
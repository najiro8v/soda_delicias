import React, { useEffect, useState } from "react";
import { dbNSQL } from "../firebaseconfig";
import Express from "./Express";
const ExpressEdit = () => {
    const [imgs, setImgs] = useState([] as any);
    useEffect(() => {
        const getCarousel = async () => {
            try {
                await dbNSQL.collection("Carrousel").get().then((doc: any) => {
                    let images = doc.docs.map((data: any) => {
                        let { name, precio, url } = data.data(), { id } = data;
                        return { name, precio, url, id };
                    })
                    setImgs(images);
                    console.log(images);
                });
            } catch (e) { console.error(e); }
        }
        getCarousel();
    }, [])
    return (
        <div className="container" >
            <div className="row">
                <div className="col">
                    <Express /></div>

            </div>
            <div className="row">
                <div className="d-flex flex-wrap justify-content-center mt-5">
                    {
                        imgs.map((infoImg: any) =>
                            <div key={infoImg.id} className="card mt-3 ms-3 col-4 col-sm-3 col-md-2" >
                                <img src={infoImg.url} className="card-img-top" alt="Imagen del producto" />
                                <div className="card-body">
                                    <h5 className="card-title" >{infoImg.name}</h5>
                                    <p className="card-text d-flex align-items-center"><i className="bi bi-cash-coin"><span className="ms-3">{infoImg.precio}</span></i></p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div >
    )
}

export default ExpressEdit;
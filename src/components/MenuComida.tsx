import React, { useState, useEffect, Fragment } from "react";
import Express from "./Express";
import Card from "./elemens/Card";
import ModalCollapseCard from "./elemens/ModalCollapseCard";

const MenuComida = (props: any) => {
    let { compras, editCompras } = props;
    const [img, setImg] = useState([] as any);
    const [openModal, setOpenModal] = useState([] as any);
    useEffect(() => {
        const readData = async () => {
            try {
                let OrderSort = JSON.parse(sessionStorage.getItem("Ordenado") || "{}");
                let listModals = JSON.parse(sessionStorage.getItem("Ordenado") || "{}");
                if (OrderSort.length === undefined) {
                    let myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");
                    myHeaders.append("Access-Control-Allow-Origin", "https://soda-delicias.web.app/");
                    await fetch("https://api-sodadelicias.herokuapp.com/api/products/menu", {
                        method: 'GET',
                        headers: myHeaders,
                        redirect: 'follow'
                    })
                        .then(response => response.json())
                        .then(result => {
                            let { Ordenado, listaModales } = result;
                            setImg(Ordenado);
                            setOpenModal(listaModales);
                            sessionStorage.setItem("Ordenado", JSON.stringify(Ordenado));
                            sessionStorage.setItem("OpenModales", JSON.stringify(listaModales));
                        })
                        .catch(error => console.log('error', error));
                } else {
                    setImg(OrderSort);
                    setOpenModal(listModals);
                }

            } catch (error) {
                console.error(error);
            }
        }
        readData();
    }, [])
    return (
        <div className="container-fluid">
            <Express />
            <div className=" col-12">
                {
                    img.map((group: any) => {
                        return (<div key={group[0].tipo} className="container-fluid d-flex justify-content-center flex-wrap mt-5">
                            <p className="h5">{group[0].tipo}</p>
                            <div className="container-fluid  d-flex flex-wrap justify-content-center ">
                                {group.map((infoImg: any, index: number) => index <= 3 ? (
                                    <Card key={infoImg.id} compras={compras} editCompras={editCompras} infoImg={infoImg}></Card>) :
                                    !(openModal[openModal.indexOf(group[0].tipo) + 1]) && (index > 3 && 4 >= index) ? (
                                        <ModalCollapseCard key={Math.random()} openModal={openModal} setOpenModal={setOpenModal} Group={group[0].tipo}>
                                        </ModalCollapseCard>) :
                                        (openModal[openModal.indexOf(group[0].tipo) + 1]) ? index + 1 === group.length ?
                                            (<Fragment key={Math.random()}>
                                                <Card compras={compras} editCompras={editCompras} infoImg={infoImg}></Card>
                                                <ModalCollapseCard openModal={openModal} setOpenModal={setOpenModal} Group={group[0].tipo}>
                                                </ModalCollapseCard>
                                            </Fragment>)
                                            : (< Card key={infoImg.id} compras={compras} editCompras={editCompras} infoImg={infoImg}></Card>
                                            )
                                            : null

                                )}
                            </div></div>)
                    })
                }
            </div>
        </div >
    )
}

export default MenuComida;

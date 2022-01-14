import React, { Fragment, useEffect, useState } from "react"

const ModalCollapseCard = (props: any) => {
    let {openModal, setOpenModal,Group}=props;
    const [stateModal,setStateModal]=useState(true);
    useEffect(()=>{
        const cloneArray = [...openModal];
        let status = (cloneArray[cloneArray.indexOf(Group) + 1]) ? false : true;
        setStateModal(status);
    },[])
    const modal = (group: "") => {
        const cloneArray = [...openModal];
        cloneArray[cloneArray.indexOf(group) + 1] = (cloneArray[cloneArray.indexOf(group) + 1]) ? false : true;
        setStateModal( cloneArray[cloneArray.indexOf(group) + 1]);
        setOpenModal(cloneArray);
    }
    return (<div key={Math.random()} className="card ms-3 mt-3 col-md-2 align-self-end card-small" style={{ cursor: "pointer" }} onClick={(e) => { modal(Group) }}>
        <div className="card-body  py-1">
            <h5 className="card-title text-center stretched-link" >{stateModal?<i className="bi bi-three-dots p-0"></i>:<Fragment><i className="bi bi-arrow-bar-left d-none d-md-block"></i><i className="bi bi-arrow-bar-up d-block d-md-none"></i></Fragment>}</h5>
        </div>
    </div>)
}

export default ModalCollapseCard;
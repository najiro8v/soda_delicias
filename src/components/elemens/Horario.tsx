import React, { useEffect, useState } from "react";
import { dbNSQL } from "../../firebaseconfig";
import { Dropdown } from "react-bootstrap";
const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const Horario = () => {
    const [horario, setHorario] = useState([] as any)
    const [estado, setEstado] = useState(false)
    useEffect(() => {
        const horario = async () => {
            try {
                await dbNSQL.collection("Horario").get().then((doc: any) => {
                    let data = doc.docs[0].data(), hora = [], fechaActual = new Date();
                    let día = semana[fechaActual.getDay()], horaAc = fechaActual.getHours() + (fechaActual.getMinutes() / 100);
                    for (const key in data) {
                        if (día === key) {
                            let horas = data[key].split("-").map((horas: any) => {
                                let hora = horas.trim();
                                let horario2 = hora.split(":");
                                return parseFloat(horario2[0]) + (parseFloat(horario2[1]) / 100)
                            });
                            let diaActivoOb = { dia: key, hora: data[key], estado: true }
                            horas[1] >= horaAc && horaAc >= horas[0] ? diaActivoOb.estado = true : diaActivoOb.estado = false;
                            hora.push(diaActivoOb);
                            setEstado(diaActivoOb.estado);
                        }
                        else {
                            hora.push({ dia: key, hora: data[key] })
                        }
                    }
                    hora.sort((a: any, b: any) => {
                        if (semana.indexOf(a.dia) > semana.indexOf(b.dia)) {
                            return 1;
                        }
                        if (semana.indexOf(a.dia) < semana.indexOf(b.dia)) {
                            return -1;
                        }
                        // a must be equal to b
                        return 0;
                    })
                    setHorario(hora);
                });
            } catch (e) { console.error(e); }
        }
        horario();
    }, [])

    const ModalHorario = (
        <div className="container-fluid d-none d-sm-none d-md-block">
            <table className="table">
                <thead>
                    <tr>

                        <th colSpan={2} className={estado ? "bg-success text-white text-center" : "bg-dark text-white text-center"} >{estado ? "Abierto" : "Cerrado"}</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        horario.map((hora: any) => (
                            <tr key={hora.dia}
                                className={hora.estado != null ?
                                    hora.estado ? "bg-success text-white" : "bg-dark text-white" : ""}
                            >
                                <th scope="row">{hora.dia}</th>
                                <td>{hora.hora}</td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>

    )
    const ModalHorarioCompleto = (
        <div className="col-12 d-flex flex-wrap d-block d-md-none">
            <Dropdown className="col-12"
            >
                <Dropdown.Toggle id="dropdown-basic" className={estado ? "bg-success text-white text-center col-12" : "bg-dark text-white text-center col-12"}>{estado ? "Abierto" : "Cerrado"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="d-flex flex-wrap col-12 justify-content-center">
                    {
                        horario.map((hora: any) => (
                            <Dropdown.Item 
                                key={hora.dia} className={hora.estado != null ?
                                    hora.estado ? "bg-success text-white d-flex flex-wrap col-12 justify-content-center" : "bg-dark text-white d-flex flex-wrap col-12 justify-content-around" : " d-flex flex-wrap col-12 justify-content-around"}
                                >
                                <p className="text-center"><b>{hora.dia}</b></p><p>{hora.hora}</p>
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
            {
                horario.map((hora: any) => (
                    hora.estado != null ?
                        hora.estado ?
                            <div className="col-12 d-flex flex-wrap" key={hora.dia}>
                                <p className="me-3 col"><b>{hora.dia}</b></p>
                                <p className="col">{hora.hora}</p>
                            </div>
                            : null : null


                ))
            }
        </div>
    )
    return (
        <div className="container-fluid " >
            <h4 className="text-center col-12 mb-3">Nuestro Horario</h4>
            {ModalHorario}
            {ModalHorarioCompleto}

        </div>
    )
}

export default Horario;
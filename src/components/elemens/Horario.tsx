import React, { useEffect, useState } from "react";
import { dbNSQL } from "../../firebaseconfig";
const semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
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
                            horas[1] >= horaAc&& horaAc>= horas[0] ? diaActivoOb.estado = true : diaActivoOb.estado = false;
                            hora.push(diaActivoOb);
                            setEstado(diaActivoOb.estado);
                        }
                        else {
                            hora.push({ dia: key, hora: data[key] })
                        }
                    }
                    
                    setHorario(hora);
                });
            } catch (e) { console.error(e); }
        }
        horario();
    }, [])

    const ModalHorario = (
        <div>
            <table>
                <tbody>
                    {
                        horario.map((hora: any) => (
                            <tr key={hora.dia}
                            className={hora.estado!=null?
                                hora.estado?"bg-success text-white":"bg-secondary text-white":""}
                            >
                                <td>{hora.dia}</td>
                                <td>{hora.hora}</td>
                                {hora.estado!=null?
                                    hora.estado?
                                        <td > Abierto</td>:
                                        <td > Cerrado</td>
                                    :null}
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>
    )
    return (
        <div>
            {ModalHorario}
        </div>
    )
}

export default Horario;
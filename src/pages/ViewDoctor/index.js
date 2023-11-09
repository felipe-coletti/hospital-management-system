import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

const ViewDoctor = () => {
    const [doctor, setDoctor] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const {id} = useParams();
    
    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/medicos/" + id)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                console.log(JSON.stringify(data))
                setDoctor(data)
            } catch (error) {
                setErrorMessage("Erro ao exibir os dados do médico.")
            }
        }
        consult()
    }, [id])

    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                <h1 className={styles.primaryTitle}>Médico</h1>
                {errorMessage === null ? (
                    <div className={styles.dataArea}>
                        <p>Nome: {doctor.nome}</p>
                        <p>CPF: {doctor.cpf}</p>
                        <p>E-mail: {doctor.email}</p>
                        <p>Senha: {doctor.senha}</p>
                    </div>
                ):(
                    <div className={styles.messageArea}>
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewDoctor

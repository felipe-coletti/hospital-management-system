import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

const ViewPatient = () => {
    const [patient, setPatient] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const {id} = useParams();
    
    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/pacientes/" + id)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setPatient(data)
            } catch (error) {
                setErrorMessage("Erro ao exibir os dados do paciente.")
            }
        }
        consult()
    }, [id])

    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                <h1 className={styles.primaryTitle}>Paciente</h1>
                {errorMessage === null ? (
                    <div className={styles.dataArea}>
                        <p>Nome: {patient.nome}</p>
                        <p>CPF: {patient.cpf}</p>
                        <p>Data de nascimento: {patient.dataDeNascimento}</p>
                        <p>Número de telefone: {patient.numeroDeTelefone}</p>
                        <p>Endereço: {patient.endereco}</p>
                        <p>Nome do responsavel: {patient.nomeDoResponsavel}</p>
                        <p>CPF do responsavel: {patient.cpfDoResponsavel}</p>
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

export default ViewPatient

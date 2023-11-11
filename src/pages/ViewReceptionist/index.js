import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

const ViewReceptionist = () => {
    const [receptionist, setReceptionist] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const {id} = useParams();
    
    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/recepcionistas/" + id)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setReceptionist(data)
            } catch (error) {
                setErrorMessage("Erro ao exibir os dados do recepcionista.")
            }
        }
        consult()
    }, [id])

    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                <h1 className={styles.primaryTitle}>Recepcionista</h1>
                {errorMessage === null ? (
                    <div className={styles.dataArea}>
                        <p>Nome: {receptionist.nome}</p>
                        <p>CPF: {receptionist.cpf}</p>
                        <p>E-mail: {receptionist.email}</p>
                        <p>Senha: {receptionist.senha}</p>
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

export default ViewReceptionist

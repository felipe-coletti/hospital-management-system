import { React, useState } from "react";
import styles from "./styles.module.css";

const DeletePatient = ({ id, onClose }) => {
    const [errorMessage, setErrorMessage] = useState("")

    const handleDelete = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/v1/pacientes/excluir/" + id, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Erro ao excluir o paciente.")
            }
            onClose()
        } catch (error) {
            setErrorMessage("Erro ao excluir o paciente. Verifique os dados informados.")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>Excluir paciente</h1>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <div className={styles.textArea}>
                <p className={styles.paragraph}>Tem certeza de que deseja excluir o paciente?</p>
                <div className={styles.buttonsArea}>
                    <button className={styles.secondaryButton} onClick={onClose}>Cancelar</button>
                    <button className={styles.primaryButton} onClick={handleDelete}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePatient

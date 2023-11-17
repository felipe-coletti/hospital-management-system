import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";

const EditReceptionist = ({ id }) => {
    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/recepcionistas/" + id)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setNome(data.nome || "")
                setCPF(data.cpf || "")
                setEmail(data.email || "")
                setSenha(data.senha || "")
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        consult()
    }, [])

    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleEdit = async () => {
        const recepcionista = {
            nome,
            cpf,
            email,
            senha
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/recepcionistas/atualizar/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recepcionista)
            })
            if (!response.ok) {
                throw new Error("Erro ao editar o recepcionista.")
            }
            onClose()
        } catch (error) {
            setErrorMessage("Erro ao editar o recepcionista. Verifique os dados informados.")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>Editar recepcionista</h1>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <form className={styles.form}>
                <div className={styles.inputField}>
                    <label htmlFor="name-input">Nome completo</label>
                    <input id="name-input" className={styles.input} onChange={(e) => setNome(e.target.value)} value={nome} type="text" required />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="cpf-input">CPF</label>
                    <input id="cpf-input" className={styles.input} onChange={(e) => setCPF(e.target.value)} value={cpf} type="text" required />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="email-input">E-mail</label>
                    <input id="email-input" className={styles.input} onChange={(e) => setEmail(e.target.value)} value={email} type="text" required />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="password-input">Senha</label>
                    <input id="password-input" className={styles.input} onChange={(e) => setSenha(e.target.value)} value={senha} type="password" required />
                </div>
                <button className={styles.primaryButton} onClick={handleEdit} type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default EditReceptionist

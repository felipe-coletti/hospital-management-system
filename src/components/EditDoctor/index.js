import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";

const EditDoctor = ({ id }) => {
    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/medicos/" + id)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setNome(data.nome || "")
                setCPF(data.cpf || "")
                setCRM(data.crm || "")
                setNumeroDeTelefone(data.numeroDeTelefone || "")
                setEndereco(data.endereco || "")
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
    const [crm, setCRM] = useState("")
    const [numeroDeTelefone, setNumeroDeTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleEdit = async () => {
        const medico = {
            nome,
            cpf,
            crm,
            numeroDeTelefone,
            endereco,
            email,
            senha
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/medicos/atualizar/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(medico)
            })
            if (!response.ok) {
                throw new Error("Erro ao editar o médico.")
            }
            onClose()
        } catch (error) {
            setErrorMessage("Erro ao editar o médico. Verifique os dados informados.")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>Editar médico</h1>
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
                    <label htmlFor="crm-input">CRM</label>
                    <input id="crm-input" className={styles.input} onChange={(e) => setCRM(e.target.value)} value={crm} type="text" required />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="phone-number-input">Número de telefone</label>
                    <input id="phone-number-input" className={styles.input} onChange={(e) => setNumeroDeTelefone(e.target.value)} value={numeroDeTelefone} type="text" required />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="address-input">Endereço</label>
                    <input id="address-input" className={styles.input} onChange={(e) => setEndereco(e.target.value)} value={endereco} type="text" required />
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

export default EditDoctor

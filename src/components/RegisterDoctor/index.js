import { React, useState } from "react";
import styles from "./styles.module.css";

const RegisterDoctor = ({onClose}) => {
    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("")
    const [crm, setCRM] = useState("")
    const [numeroDeTelefone, setNumeroDeTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleRegister = async () => {
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
            const response = await fetch("http://localhost:8080/api/v1/medicos/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(medico)
            })
            if (!response.ok) {
                throw new Error("Erro ao cadastrar o médico.")
            }
            onClose()
        } catch (error) {
            setErrorMessage("Erro ao cadastrar o médico. Verifique os dados informados.")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>Cadastrar médico</h1>
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <form className={styles.form}>
                <div className={styles.inputField}>
                    <label htmlFor="name-input">Nome completo</label>
                    <input id="name-input" className={styles.input} onChange={(e) => setNome(e.target.value)} type="text" required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="cpf-input">CPF</label>
                    <input id="cpf-input" className={styles.input} onChange={(e) => setCPF(e.target.value)} type="text" required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="crm-input">CRM</label>
                    <input id="crm-input" className={styles.input} onChange={(e) => setCRM(e.target.value)} type="text" required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="phone-number-input">Número de telefone</label>
                    <input id="phone-number-input" className={styles.input} onChange={(e) => setNumeroDeTelefone(e.target.value)} type="text" required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="address-input">Endereço</label>
                    <input id="address-input" className={styles.input} onChange={(e) => setEndereco(e.target.value)} type="text" required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="email-input">E-mail</label>
                    <input id="email-input" className={styles.input} onChange={(e) => setEmail(e.target.value)} type="text" required/>
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="password-input">Senha</label>
                    <input id="password-input" className={styles.input} onChange={(e) => setSenha(e.target.value)} type="password" required/>
                </div>
                <button className={styles.primaryButton} onClick={handleRegister} type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export default RegisterDoctor

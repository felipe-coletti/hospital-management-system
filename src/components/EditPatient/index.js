import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";

const EditPatient = ({ id }) => {
    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/pacientes/" + id)
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setNome(data.nome || "")
                setCPF(data.cpf || "")
                setDataDeNascimento(data.dataDeNascimento || "")
                setNumeroDeTelefone(data.numeroDeTelefone || "")
                setEndereco(data.endereco || "")
                setEmail(data.email || "")
                setSenha(data.senha || "")
                setNomeDoResponsavel(data.nomeDoResponsavel || "")
                setCPFDoResponsavel(data.cpfDoResponsavel || "")
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        consult()
    }, [])

    const [nome, setNome] = useState("")
    const [cpf, setCPF] = useState("")
    const [dataDeNascimento, setDataDeNascimento] = useState("")
    const [numeroDeTelefone, setNumeroDeTelefone] = useState("")
    const [endereco, setEndereco] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nomeDoResponsavel, setNomeDoResponsavel] = useState("")
    const [cpfDoResponsavel, setCPFDoResponsavel] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleEdit = async () => {
        const paciente = {
            nome,
            cpf,
            dataDeNascimento,
            numeroDeTelefone,
            endereco,
            email,
            senha,
            nomeDoResponsavel,
            cpfDoResponsavel
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/pacientes/atualizar/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paciente)
            })
            if (!response.ok) {
                throw new Error("Erro ao editar o paciente.")
            }
            onClose()
        } catch (error) {
            setErrorMessage("Erro ao editar o paciente. Verifique os dados informados.")
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.primaryTitle}>Editar paciente</h1>
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
                    <label htmlFor="birthdate-input">Data de nascimento</label>
                    <input id="birthdate-input" className={styles.input} onChange={(e) => setDataDeNascimento(e.target.value)} value={dataDeNascimento} type="text" required />
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
                <div className={styles.inputField}>
                    <label htmlFor="responsible-name-input">Nome do responsável</label>
                    <input id="responsible-name-input" className={styles.input} onChange={(e) => setNomeDoResponsavel(e.target.value)} value={nomeDoResponsavel} type="text" required />
                </div>
                <div className={styles.inputField}>
                    <label htmlFor="responsible-cpf-input">CPF do responsável</label>
                    <input id="responsible-cpf-input" className={styles.input} onChange={(e) => setCPFDoResponsavel(e.target.value)} value={cpfDoResponsavel} type="text" required />
                </div>
                <button className={styles.primaryButton} onClick={handleEdit} type="submit">Salvar</button>
            </form>
        </div>
    )
}

export default EditPatient

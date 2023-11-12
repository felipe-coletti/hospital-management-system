import React from "react";
import styles from "./styles.module.css";

const Signin = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                <h1 className={styles.primaryTitle}>Entrar</h1>
                <form className={styles.form}>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="email-input">E-mail</label>
                        <input className={styles.input} type="text" required/>
                    </div>
                    <div className={styles.inputField}>
                        <label className={styles.label} htmlFor="password-input">Senha</label>
                        <input className={styles.input} type="password" required/>
                    </div>
                    <div className={styles.linksArea}>
                        <a className={styles.link} href="">Esqueceu a senha?</a>
                    </div>
                    <button className={styles.primaryButton} type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}

export default Signin
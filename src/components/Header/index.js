import React from "react";
import styles from "./styles.module.css";

const Header = () => {
    return(
        <header className={styles.container}>
            <img src="" alt="Logo"/>
            <a className={styles.button} href="/signin">Entrar</a>
        </header>
    )
}

export default Header
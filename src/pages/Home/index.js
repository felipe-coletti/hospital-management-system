import React from "react";
import styles from "./styles.module.css";
import { Icon } from '@iconify/react';

const Home = () => {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div>
                    <h1 className={styles.primaryTitle}></h1>
                    <p className={styles.paragraph}></p>
                    <button className={styles.primaryButton}>Entrar</button>
                </div>
            </section>
            <section className={styles.section}>
                <div className={styles.grid}>
                    <div className={styles.contentArea}>
                        <h2 className={styles.secondaryTitle}></h2>
                        <p className={styles.paragraph}></p>
                    </div>
                    <div className={styles.contentArea}>
                        <h2 className={styles.secondaryTitle}></h2>
                        <p className={styles.paragraph}></p>
                    </div>
                    <div className={styles.contentArea}>
                        <h2 className={styles.secondaryTitle}></h2>
                        <p className={styles.paragraph}></p>
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                <h1 className={styles.primaryTitle}>Licenças</h1>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h2 className={styles.secondaryTitle}>Licença gratuita</h2>
                        <p className={styles.paragraph}><span className={styles.highlightText}>R$ 0,00</span>/mês</p>
                        <ul className={styles.benefitsList}>
                            <li className={styles.benefit}>
                                <span className={styles.benefitIcon}><Icon icon="ic:outline-check" /></span><p className={styles.paragraph}>Acesso a todos os recursos básicos.</p>
                            </li>
                        </ul>
                        <button className={styles.primaryButton}>Entrar</button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
import { React, useEffect } from "react";
import styles from "./styles.module.css";
import { Icon } from '@iconify/react';

const Modal = ({ onClose, children }) => {
    useEffect((onClose) => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleEsc)
    
        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [])

    return (
        <div className={styles.modalContainer}>
            <div className={styles.container}>
                <div className={styles.backdrop} onClick={onClose}></div>
                <div className={styles.contentArea}>
                    <div className={styles.topArea}>
                        <button className={styles.button} onClick={onClose}>
                            <Icon icon="tabler:x" />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal

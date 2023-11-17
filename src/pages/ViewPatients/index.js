import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import Modal from "../../components/Modal";
import RegisterPatient from "../../components/RegisterPatient";
import EditPatient from "../../components/EditPatient";
import DeletePatient from "../../components/DeletePatient";

const ViewPatients = () => {
    const [patients, setPatients] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedAction, setSelectedAction] = useState(null)

    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/pacientes")
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                setPatients(data)
            } catch (error) {
                setErrorMessage("Erro ao exibir os dados dos pacientes.")
            }
        }
        consult()
    }, [])

    const openModal = (id, action) => {
        setSelectedItem(id)
        setSelectedAction(action)
    }

    const closeModal = () => {
        setSelectedItem(null)
        setSelectedAction(null)
    }

    return (
        <div className={styles.container}>
            <div className={styles.contentArea}>
                <h1 className={styles.primaryTitle}>Pacientes</h1>
                <div className={styles.optionsArea}>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBar}>
                            <button title="Pesquisar" className={styles.searchIcon}>
                                <Icon icon="iconamoon:search-bold" />
                            </button>
                            <input id="search-input" className={styles.searchInput} placeholder="Pesquisar" />
                        </div>
                        <button className={styles.primaryButton}>
                            <Icon className={styles.icon} icon="ion:filter" />
                            Filtrar
                        </button>
                    </div>
                    <button className={styles.primaryButton} onClick={() => openModal(null, 'register')}>
                        <Icon className={styles.icon} icon="akar-icons:plus" />
                        Cadastrar paciente
                    </button>
                </div>
                {errorMessage === null ? (
                    patients.length > 0 ? (
                        <table className={styles.table}>
                            <thead className={styles.tableHeader}>
                                <tr className={styles.tableRow}>
                                    <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>#</h2></th>
                                    <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>Nome</h2></th>
                                    <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>CPF</h2></th>
                                    <th className={styles.tableItem}><h2 className={styles.secondaryTitle}>Ações</h2></th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                {patients.map((patient, i) => (
                                    <tr className={styles.tableRow} key={patient.id}>
                                        <td className={styles.tableItem}>
                                            <p className={styles.paragraph}>{i + 1}</p>
                                        </td>
                                        <td className={styles.tableItem}>
                                            <p className={styles.paragraph}>
                                                <Link to={`/patients/${patient.id}`} className={styles.cardLink}>
                                                    {patient.nome}
                                                </Link>
                                            </p>
                                        </td>
                                        <td className={styles.tableItem}>
                                            <p className={styles.paragraph}>{patient.cpf}</p>
                                        </td>
                                        <td className={styles.tableItem}>
                                            <div className={styles.actionsArea}>
                                                <button title="Editar" className={styles.button} onClick={() => openModal(patient.id, 'edit')}>
                                                    <Icon icon="prime:pencil" />
                                                </button>
                                                <button title="Excluir" className={styles.button} onClick={() => openModal(patient.id, 'delete')}>
                                                    <Icon icon="ic:outline-delete" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={styles.messageArea}>
                            <p className={styles.paragraph}>Cadastre pacientes para visualiza-los aqui.</p>
                        </div>
                    )
                ) : (
                    <div className={styles.messageArea}>
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    </div>
                )}
                {selectedAction === 'register' && (
                    <Modal onClose={closeModal}>
                        <RegisterPatient onClose={closeModal} />
                    </Modal>
                )}
                {selectedItem !== null && (
                    <div>
                        {selectedAction === 'edit' && (
                            <Modal onClose={closeModal}>
                                <EditPatient id={selectedItem} onClose={closeModal} />
                            </Modal>
                        )}
                        {selectedAction === 'delete' && (
                            <Modal onClose={closeModal}>
                                <DeletePatient id={selectedItem} onClose={closeModal} />
                            </Modal>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewPatients
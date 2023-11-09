import { React, useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Icon } from '@iconify/react';
import Modal from "../../components/Modal";
import RegisterDoctor from "../../components/RegisterDoctor";
import EditDoctor from "../../components/EditDoctor";
import DeleteDoctor from "../../components/DeleteDoctor";

const ViewDoctors = () => {
    const [doctors, setDoctors] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedAction, setSelectedAction] = useState(null)

    useEffect(() => {
        const consult = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/medicos")
                if (!response.ok) {
                    throw new Error()
                }
                const data = await response.json()
                console.log(JSON.stringify(data))
                setDoctors(data)
            } catch (error) {
                setErrorMessage("Erro ao exibir os dados dos médicos.")
            }
        }
        consult()
    })

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
                <h1 className={styles.primaryTitle}>Médicos</h1>
                <div className={styles.optionsArea}>
                    <div className={styles.searchArea}>
                        <div className={styles.searchBar}>
                            <button title="Pesquisar" className={styles.searchIcon}>
                                <Icon icon="iconamoon:search-bold" />
                            </button>
                            <input className={styles.searchInput} placeholder="Pesquisar" />
                        </div>
                        <button className={styles.primaryButton}>
                            <Icon className={styles.icon} icon="ion:filter" />
                            Filtrar
                        </button>
                    </div>
                    <button className={styles.primaryButton} onClick={() => openModal(null, 'register')}>
                        <Icon className={styles.icon} icon="akar-icons:plus" />
                        Cadastrar médico
                    </button>
                </div>
                {errorMessage === null ? (
                    doctors.length > 0 ? (
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
                                {doctors.map((doctor, i) => (
                                    <tr className={styles.tableRow} key={doctor.id}>
                                        <td className={styles.tableItem}>
                                            <p className={styles.paragraph}>{i + 1}</p>
                                        </td>
                                        <td className={styles.tableItem}>
                                            <p className={styles.paragraph}>
                                                <Link to={`/doctors/${doctor.id}`} className={styles.cardLink}>
                                                    {doctor.nome}
                                                </Link>
                                            </p>
                                        </td>
                                        <td className={styles.tableItem}>
                                            <p className={styles.paragraph}>{doctor.cpf}</p>
                                        </td>
                                        <td className={styles.tableItem}>
                                            <div className={styles.actionsArea}>
                                                <button title="Editar" className={styles.button} onClick={() => openModal(doctor.id, 'edit')}>
                                                    <Icon icon="prime:pencil" />
                                                </button>
                                                <button title="Excluir" className={styles.button} onClick={() => openModal(doctor.id, 'delete')}>
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
                            <p className={styles.paragraph}>Cadastre médicos para visualiza-los aqui.</p>
                        </div>
                    )
                ) : (
                    <div className={styles.messageArea}>
                        <p className={styles.errorMessage}>{errorMessage}</p>
                    </div>
                )}
                {selectedAction === 'register' && (
                    <Modal onClose={closeModal} content={<RegisterDoctor onClose={closeModal} />} />
                )}
                {selectedItem !== null && (
                    <div>
                        {selectedAction === 'edit' && (
                            <Modal onClose={closeModal} content={<EditDoctor id={selectedItem} onClose={closeModal} />} />
                        )}
                        {selectedAction === 'delete' && (
                            <Modal onClose={closeModal} content={<DeleteDoctor id={selectedItem} onClose={closeModal} />} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ViewDoctors
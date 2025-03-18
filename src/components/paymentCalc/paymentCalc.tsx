import { useContext } from 'react';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import Modal from '../modal/modal';
import styles from './paymentCalc.module.css';
import CalcForm from '../calcForm/calcForm';

const PaymentCalc = () => {
    const [ openModal ] = useContext(ModalContext);

    const openModalHandler = () => {
        openModal(<Modal><CalcForm /></Modal>)
    }

    return (
        <>
            <button className={styles.button} onClick={openModalHandler}>Расчёт платежей</button>
        </>
    )
}

export default PaymentCalc;
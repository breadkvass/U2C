import { useEffect, useCallback, SyntheticEvent, useContext, FC, ReactElement } from 'react';
import { ModalContext } from '../../hooks/useModal/useModalProvider';
import Overlay from './overlay/overlay';
import styles from "./modal.module.css";
import CloseButton from '../closeButton/closeIcon';

const stopPropagation = (e: SyntheticEvent<Element, Event>) => e.stopPropagation();

type ModalType = {
    children: ReactElement;
}

const Modal: FC<ModalType> = ({children}) => {
    const [ , closeModal ] = useContext(ModalContext);

    const escHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            closeModal();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", escHandler, false);

        return () => {
            document.removeEventListener("keydown", escHandler, false);
        };

    }, [escHandler]);

    return (
        <Overlay closeHandler={() => closeModal()}>
            <div className={styles.modal} onClick={stopPropagation}>
                <CloseButton closeHandler={() => closeModal()} iconStyle={styles.closeButton} />
                {children}
            </div>
        </Overlay>
    );
}

export default Modal;
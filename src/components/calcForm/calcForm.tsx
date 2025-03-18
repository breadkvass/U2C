import { FC, useState } from 'react';
import styles from './calcForm.module.css';

type CheckboxProps = {
    value: string;
    type: 'monthes' | 'period';
}

const CalcForm = () => {
    const [ amount, setAmount ] = useState<number>();
    const [ monthsValue, setMonthsValue ] = useState('12');
    const [ period, setPeriod ] = useState('в год');
    const [ res, setRes ] = useState<number>();

    const onSubmitHandler = () => {
        console.log('рассчитать')
    }

    const Checkbox: FC<CheckboxProps> = ({value, type}) => {
        return (
            <li>
                <input type="checkbox"
                    checked={(type === 'monthes' ? monthsValue : period) === value}
                    onChange={(e) => {
                        if (type === 'monthes') {
                            setMonthsValue(e.target.value)
                        } else setPeriod(e.target.value)
                    }}
                    id={value}
                    name={value}
                    value={value}
                />
                <label htmlFor={value}>{value}</label>
            </li>
        )
    }

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <h3 className={styles.title}>Платежи по кредиту</h3>
            <p className={styles.text}>Введите сумму кредита и выберите срок, на который вы хотите его оформить.</p>
            <p className={styles.text}>Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы.</p>
            <label className={styles.label}>Ваша сумма кредита
                <input className={styles.input}
                    type='number'
                    placeholder='Введите данные'
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                />
            </label>
            <button className={styles.textButton}>Рассчитать</button>
            <div className={styles.months}>
                <p className={styles.point}>Количество месяцев?</p>
                <ul className={styles.checkboxes}>
                    <Checkbox value='12' type='monthes' />
                    <Checkbox value='24' type='monthes' />
                    <Checkbox value='36' type='monthes' />
                    <Checkbox value='48' type='monthes' />
                </ul>
            </div>
            <div className={styles.periods}>
                <p className={styles.point}>Итого ваш платеж по кредиту:</p>
                <ul className={styles.checkboxes}>
                    <Checkbox value='в год' type='period' />
                    <Checkbox value='в месяц' type='period' />
                </ul>
            </div>
            <p className={styles.res}>{res} рублей</p>

            <button className={styles.submitButton} type='submit'>Добавить</button>
        </form>
    )
}

export default CalcForm;
import { ChangeEvent, FC, FormEvent, useMemo, useState } from 'react';
import { countPayment, CheckboxProps, monthsCheckboxes, periodCheckboxes, pluralize } from '../../utils/utils';
import styles from './calcForm.module.css';


const CalcForm = () => {
    const [ amountInputValue, setAmountInputValue ] = useState('')
    const [ amount, setAmount ] = useState('');
    const [ monthsValue, setMonthsValue ] = useState('12');
    const [ isFullCalc, setIsFullCalc ] = useState(false);
    const [ periodValue, setPeriodValue ] = useState('в месяц');
    const [ error, setError ] = useState('');

    const onSubmitHandler = () => {
        console.log('добавить')
    }

    const countedPayment = useMemo(() => countPayment(amount, periodValue, monthsValue), [amountInputValue, amount, periodValue, monthsValue])
    const rub = useMemo(() => pluralize(Number(countedPayment)), [countedPayment])

    const onCheckHandler = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (type === 'months') {
            validate();
            setMonthsValue(e.target.value);
        } else if (type === 'period') {
            validate();
            setPeriodValue(e.target.value);
        };
    }
    
    const validate = () => {
        const checkedAmount = amountInputValue.replace('₽','').replace(/\s/g, '')

        if (!checkedAmount) {
            setError('Поле обязательно для заполнения');
            setIsFullCalc(false);
        } else if (Number(checkedAmount) <= 999 ) {
            setError('Введите число более 1000');
            setIsFullCalc(false);
        } else if (Number(checkedAmount) > 999999999 ) {
            setError('Число слишком большое');
            setIsFullCalc(false);
        } else if (Number(checkedAmount) > 999) {
            setError('');
            setAmount(checkedAmount);
        }
    }

    const onClickCountHandler = (e: FormEvent) => {
        e.preventDefault();
        validate();
        setIsFullCalc(true);
    }

    const Checkbox: FC<CheckboxProps> = ({value, type}) => {
        return (
            <li>
                <input type="checkbox"
                    checked={(type === 'months' ? monthsValue : periodValue) === value}
                    onChange={(e) => onCheckHandler(e, type)}
                    id={value}
                    name={value}
                    value={value}
                />
                <label htmlFor={value}>{value}</label>
            </li>
        )
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let res = e.target.value.replace(/\d $/, '').replace(/\D/g, '').replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')+ ' ₽';
                        
        if (res === ' ₽') setAmountInputValue('')
            else setAmountInputValue(res)
    }

    return (
        <form className={styles.form} onSubmit={onSubmitHandler}>
            <h3 className={styles.title}>Платежи по кредиту</h3>
            <p className={styles.text}>Введите сумму кредита и выберите срок, на который вы хотите его оформить.</p>
            <p className={styles.text}>Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы.</p>
            <label className={styles.label}>
                <p className={styles.point}>Ваша сумма кредита</p>
                <input className={styles.input}
                    type='text'
                    placeholder='Введите данные'
                    value={amountInputValue}
                    onChange={onChangeInputHandler}
                    required
                />
                {<p className={styles.error}>{error}</p>}
            </label>
            <button className={styles.textButton} onClick={onClickCountHandler}> Рассчитать</button>
            <div className={styles.months}>
                <p className={styles.point}>Количество месяцев?</p>
                <ul className={styles.checkboxes}>
                    {monthsCheckboxes.map((item, i) => <Checkbox key={i} value={item.value} type={item.type} />)}
                </ul>
            </div>
            {isFullCalc && amount && <>
                <div className={styles.periods}>
                    <p className={styles.point}>Итого ваш платеж по кредиту:</p>
                    <ul className={styles.checkboxes}>
                        {periodCheckboxes.map((item, i) => <Checkbox key={i} value={item.value} type={item.type} />)}
                    </ul>
                </div>
                <p className={styles.res}>{`${countedPayment} ${rub}`}</p>
            </>}
            <button className={styles.submitButton} type='submit'>Добавить</button>
        </form>
    )
}

export default CalcForm;
export type CheckboxProps = {
    value: string;
    type: 'months' | 'period';
}

export const countPayment = (
    amount: string,
    periodValue: string,
    monthsValue: string
) => {
    const round = (num: number) => num.toFixed(2).replace('.', ',').replace(',00', '').replace(',0', '').replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');

    if (amount) {
        const num = amount.replace('₽','').replace(' ','');

        if (periodValue === 'в месяц') {
            return round(Number(num) / Number(monthsValue));
        } else if (periodValue === 'в год') {
            return round(Number(num) / Number(monthsValue) * 12);
        }
    }
}

export const monthsCheckboxes: CheckboxProps[] = [
    {value: '12', type: 'months'},
    {value: '24', type: 'months'},
    {value: '36', type: 'months'},
    {value: '48', type: 'months'}
]

export const periodCheckboxes: CheckboxProps[] = [
    {value: 'в год', type: 'period'},
    {value: 'в месяц', type: 'period'},
]

const rub = ['рубль', 'рубля', 'рублей'];

export const pluralize = (num: number) => {
    const suffix = rub[num % 10 === 1 && num % 100 !== 11 ? 0 : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? 1 : 2];
    return suffix;
};
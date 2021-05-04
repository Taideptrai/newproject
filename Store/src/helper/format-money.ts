const regex_fomat_money = /\B(?=(\d{3})+(?!\d))/g;

export function parserInput(value?: any) {
    if (!value) return 0;
    return `${value}`.replace(/vnd\s?|(,*)/g, '');
}

export function formatterInput(value: any) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatMoney(value: string | number, separator: string = '.'): string {
    return `${value}`.replace(regex_fomat_money, separator);
}

export default formatMoney;

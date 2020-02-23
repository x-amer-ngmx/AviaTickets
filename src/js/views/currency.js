class CurrencyUI {
  constructor() {
    this.dictionary = {
      USD: '$',
      EUR: '€',
    };
  }

  get currencySymbol() {
    const currency = document.getElementById('currency');
    return this.dictionary[currency.value];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init dropdown
const dropdowns = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdowns, {closeOnClick: false});

// Init select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

// Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: {
    Apple: null,
    Microsoft: null,
    Google: 'https://placehold.it/250x250',
  },
});

// Init datepickers
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm',
});

export function getSelectInstance (el) {
  return M.FormSelect.getInstance(el);
}

export function getAutocompleteInstance (el) {
  return M.Autocomplete.getInstance(el);
}

export function getDatePickerInstance (el) {
  return M.Datepicker.getInstance(el);
}

export function getDropDownInstance (el) {
  return M.Dropdown.getInstance(el)
}

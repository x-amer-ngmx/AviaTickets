import { getDropDownInstance } from '../plugins/materialize'
import currencyUI from './currency';

class FavoritsUI {
  constructor (dropDownInstance, currency) {
    this.container = document.getElementById('favorits-dropdown')
    const favorit = document.querySelector('.dropdown-trigger')
    this.dropDownInstance = dropDownInstance(favorit)
    this._favoritsList = []
    this.currency = currency

    this.container.addEventListener('click', e => {
      if (e.target.localName === 'a') {
        e.preventDefault()
        const favoritId = e.target.hash ?e.target.hash.replace('#','') : null

        this.removeFavorit(favoritId)
      }
    })

  }

  addFavorit (favorit) {
    const index = this._favoritsList.map(f => f.id).indexOf(favorit.id, 'id')
    
    if (index < 0) {
      this._favoritsList.push(favorit)
      this._renderFavorits()
      this.dropDownInstance.close()
    }
  }

  _renderFavorits () {
    this.clearContainer()
    let fragment = ''
    this._favoritsList.forEach(favorit => {
      fragment += FavoritsUI.getFavoritTemplate(favorit, this.currency.currencySymbol)
    })
    this.container.insertAdjacentHTML('afterbegin', fragment)
  }

  removeFavorit (favoritId) {
    const index = this._favoritsList.map(f => f.id).indexOf(favoritId, 'id')
    if (index > -1) {
      this._favoritsList.splice(index, 1)
      const ch = this.container.querySelector(`.ele-${favoritId}`)
      if (!this._favoritsList.length) {
        document.activeElement.blur()
      }
      this.container.removeChild(ch)
    }

    this.dropDownInstance.recalculateDimensions()
  }

  clearContainer (clearData = false) {
    if (clearData) {
      this._favoritsList = []
    }
    this.container.innerHTML = ''
  }

  static getFavoritTemplate (favorit, currency) {
    return `
        <div class="ele-${favorit.id} favorite-item d-flex align-items-start">
        <img
          src="${favorit.airline_logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${favorit.origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${favorit.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${favorit.departure_at}</span>
            <span class="ticket-price ml-auto">${currency}${favorit.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${favorit.transfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${favorit.flight_number}</span>
          </div>
          <a href="#${favorit.id}"
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            >Delete</a
          >
        </div>
      </div>
    `
  }
}

const favoritsUI = new FavoritsUI(getDropDownInstance, currencyUI)

export default favoritsUI
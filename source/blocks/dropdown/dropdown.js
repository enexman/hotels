export default class Dropdown {
  constructor(id) {
    this.blockNode = document.querySelector(id);
    if (!this.blockNode) return;

    this.listNode = this.blockNode.querySelector('.js-dropdown__list');
    this.liNodes = this.blockNode.querySelectorAll('.js-dropdown__option');
    this.inputNode = this.blockNode.querySelector('.js-dropdown__text');
    this.listNode.classList.remove('dropdown__list_open');

    this._defaultData();

    this._toggleList();

    this._addEventListeners();
  }

  _addEventListeners() {
    Array.from(this.liNodes).forEach((it, idx) => {
      const numeric = it.querySelector('.js-dropdown__numeric');
      const minus = it.querySelector('.js-dropdown__button-minus');

      it.addEventListener('click', (ev) => {
        this._updateNumeric(numeric, idx);

        if (ev.target.classList.contains('dropdown__button_plus')) {
          numeric.textContent = +numeric.textContent + 1;
          this._updateInputValuePlus(idx);
        }

        if (ev.target.classList.contains('dropdown__button_minus')) {
          if (!+numeric.textContent) return;
          numeric.textContent = +numeric.textContent - 1;
          this._updateInputValueMinus(idx);
        }

        this._disableMinusButton(numeric, minus);
      });
    });
  }

  _toggleList() {
    this.inputNode.addEventListener('click', () => {
      this.listNode.classList.toggle('dropdown__list_open');
    });
  }

  _updateNumeric(numeric, idx) {
    switch (idx) {
      case 0: this.bedRoom = +numeric.textContent;
        break;
      case 1: this.bed = +numeric.textContent;
        break;
      case 2: this.bathRoom = +numeric.textContent;
        break;
      default: break;
    }
  }

  _updateInputValuePlus(idx) {
    switch (idx) {
      case 0: this.bedRoom += 1;
        break;
      case 1: this.bed += 1;
        break;
      case 2: this.bathRoom += 1;
        break;
      default: break;
    }

    const bedRooms = this.bedRoom ? `, ${this.bedRoom} спальни ` : '';
    const beds = this.bed ? `, ${this.bed} кровати ` : '';
    const bathRooms = this.bathRoom ? `, ${this.bathRoom} вынные комнаты ` : '';
    this.inputNode.value = (bedRooms + beds + bathRooms).slice(2, -1);
  }

  _updateInputValueMinus(idx) {
    switch (idx) {
      case 0: this.bedRoom -= 1;
        break;
      case 1: this.bed -= 1;
        break;
      case 2: this.bathRoom -= 1;
        break;
      default: break;
    }
    const bedRooms = this.bedRoom ? `, ${this.bedRoom} спальни ` : '';
    const beds = this.bed ? `, ${this.bed} кровати ` : '';
    const bathRooms = this.bathRoom ? `, ${this.bathRoom} вынные комнаты ` : '';
    this.inputNode.value = (bedRooms + beds + bathRooms).slice(2, -1);
  }

  _defaultData() {
    this.bedRoom = 0;
    this.bed = 0;
    this.bathRoom = 0;
  }

  _disableMinusButton(numeric, minus) {
    if (numeric) {
      if (+numeric.textContent) {
        minus.classList.remove('dropdown__button_disabled');
      } else {
        minus.classList.add('dropdown__button_disabled');
      }
    }
  }
}

new Dropdown('#drop-fe');
new Dropdown('#drop-fe-second');

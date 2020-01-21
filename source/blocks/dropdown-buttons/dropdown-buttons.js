export default class DropdownButtons {
  constructor(id) {
    this.blockNode = document.querySelector(id);
    if (!this.blockNode) return;
    this.listNode = this.blockNode.querySelector('.js-dropdown-buttons__list');
    this.liNodes = this.blockNode.querySelectorAll('.js-dropdown-buttons__option');
    this.submitNode = this.blockNode.querySelector('.js-dropdown-buttons__button-bottom_submit');
    this.clearNode = this.blockNode.querySelector('.js-dropdown-buttons__button-bottom_clear');
    this.inputNode = this.blockNode.querySelector('.js-dropdown-buttons__input');

    this._defaultData();

    this._toggleList();

    if (this.clearNode) {
      this.clearNode.style.display = 'none';
    }

    this._addEventListenerToSubmit();

    this._addEventListenerToClear();

    this._addEventListenerToList();
  }

  _addEventListenerToClear() {
    this.clearNode.addEventListener('click', () => {
      this.inputNode.value = '';
      this._defaultData();
      Array.from(this.liNodes).forEach((it) => {
        const item = it.querySelector('.js-dropdown-buttons__numeric');
        if (item) item.textContent = ' 0 ';

        const minus = it.querySelector('.js-dropdown-buttons__button_minus');
        if (minus) {
          minus.classList.add('dropdown-buttons__button_disabled');
        }
      });
      this.clearNode.style.display = 'none';
    });
  }

  _addEventListenerToSubmit() {
    this.submitNode.addEventListener('click', () => {
      const babyInput = this.baby ? `, ${this.baby} младенец` : '';
      this.inputNode.value = `${this.guest} гостя${babyInput}`;
      this.listNode.classList.remove('dropdown-buttons__list_open');
    });
  }

  _addEventListenerToList() {
    Array.from(this.liNodes).forEach((it, idx) => {
      const numeric = it.querySelector('.js-dropdown-buttons__numeric');
      const minus = it.querySelector('.js-dropdown-buttons__button_minus');
      it.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('dropdown-buttons__button_plus')) {
          numeric.textContent = +numeric.textContent + 1;
          if (idx === 2) {
            this.baby += 1;
          } else {
            this.guest += 1;
          }
        }
        if (ev.target.classList.contains('dropdown-buttons__button_minus')) {
          if (!+numeric.textContent) return;
          numeric.textContent = +numeric.textContent - 1;
          if (idx === 2) {
            this.baby -= 1;
          } else {
            this.guest -= 1;
          }
        }

        if (!this.guest && !this.baby) {
          this.clearNode.style.display = 'none';
        } else {
          this.clearNode.style.display = '';
        }

        this._disableMinusButton(numeric, minus);
      });
    });
  }

  _toggleList() {
    this.inputNode.addEventListener('click', () => {
      this.listNode.classList.toggle('dropdown-buttons__list_open');
      this.inputNode.classList.toggle('dropdown-buttons__input_border-bottom');
    });
  }

  _defaultData() {
    this.guest = 0;
    this.baby = 0;
  }

  _disableMinusButton(numeric, minus) {
    if (numeric) {
      if (+numeric.textContent) {
        minus.classList.remove('dropdown-buttons__button_disabled');
      } else {
        minus.classList.add('dropdown-buttons__button_disabled');
      }
    }
  }
}

new DropdownButtons('#drop-first');
new DropdownButtons('#drop-second');
new DropdownButtons('#drop-third');

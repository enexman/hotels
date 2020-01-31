class DropdownButtons {
  constructor(elementNode) {
    this.blockNode = elementNode;
    this._defaultState();
    this._addEventListeners();
  }

  _addEventListeners() {
    this._addEventListenerToSubmit();

    this._addEventListenerToClear();

    this._addEventListenerToList();
  }

  _addEventListenerToClear() {
    this.clearNode.addEventListener('click', this._handleClearNodeClick.bind(this));
  }

  _addEventListenerToSubmit() {
    this.submitNode.addEventListener('click', this._handleSubmitNodeClick.bind(this));
  }

  _addEventListenerToList() {
    Array.from(this.liNodes).forEach((it, idx) => {
      it.addEventListener('click', this._handleLiNodeClick(it, idx).bind(this));
    });
  }

  _toggleList() {
    this.inputNode.addEventListener('click', this._handleInputNodeClick.bind(this));
  }

  _handleClearNodeClick() {
    this.inputNode.value = '';
    this.guest = 0;
    this.baby = 0;

    Array.from(this.liNodes).forEach((it) => {
      const item = it.querySelector('.js-dropdown-buttons__numeric');
      if (item) item.textContent = ' 0 ';

      const minus = it.querySelector('.js-dropdown-buttons__button_minus');
      if (minus) {
        minus.classList.add('dropdown-buttons__button_disabled');
      }
    });
    this.clearNode.style.display = 'none';
  }

  _handleSubmitNodeClick() {
    const babyInput = this.baby ? `, ${this.baby} младенец` : '';
    this.inputNode.value = `${this.guest} гостя${babyInput}`;
    this.listNode.classList.remove('dropdown-buttons__list_open');
  }

  _handleLiNodeClick(it, idx) {
    return (ev) => {
      const numeric = it.querySelector('.js-dropdown-buttons__numeric');
      const minus = it.querySelector('.js-dropdown-buttons__button_minus');
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
    };
  }

  _handleInputNodeClick() {
    this.listNode.classList.toggle('dropdown-buttons__list_open');
    this.inputNode.classList.toggle('dropdown-buttons__input_border-bottom');
  }

  _defaultState() {
    this.listNode = this.blockNode.querySelector('.js-dropdown-buttons__list');
    this.liNodes = this.blockNode.querySelectorAll('.js-dropdown-buttons__option');
    this.submitNode = this.blockNode.querySelector('.js-dropdown-buttons__button-bottom_submit');
    this.clearNode = this.blockNode.querySelector('.js-dropdown-buttons__button-bottom_clear');
    this.inputNode = this.blockNode.querySelector('.js-dropdown-buttons__input');
    this.guest = 0;
    this.baby = 0;
    this._toggleList();
    if (this.clearNode) {
      this.clearNode.style.display = 'none';
    }
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

const dropdownButtons = document.querySelectorAll('.js-dropdown-buttons');

Array.from(dropdownButtons).forEach((it) => {
  new DropdownButtons(it);
});

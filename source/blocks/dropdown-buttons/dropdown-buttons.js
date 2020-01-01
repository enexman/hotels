export default class DropdownButtons {
  constructor(id) {
    this.blockNode = document.querySelector(id);
    this.listNode = this.blockNode.querySelector('.js-dropdown-buttons__list');
    this.liNodes = this.blockNode.querySelectorAll('.js-dropdown-buttons__option');
    this.submitNode = this.blockNode.querySelector('.js-dropdown-buttons__button-bottom_submit');
    this.clearNode = this.blockNode.querySelector('.js-dropdown-buttons__button-bottom_clear');
    this.inputNode = this.blockNode.querySelector('.js-dropdown-buttons__input');

    this.guest = 0;
    this.baby = 0;

    this.inputNode.addEventListener('click', () => {
      this.listNode.classList.toggle('dropdown-buttons__list_open');
    });

    if (this.clearNode) {
      this.clearNode.style.display = 'none';
    }

    this.submitNode.addEventListener('click', () => {
      const babyInput = this.baby ? `, ${this.baby} младенец` : '';
      this.inputNode.value = `${this.guest} гостя${babyInput}`;
      this.listNode.classList.remove('dropdown-buttons__list_open');
    });

    if (this.clearNode) {
      this.clearNode.addEventListener('click', () => {
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
      });
    }

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

        if (numeric) {
          if (+numeric.textContent) {
            minus.classList.remove('dropdown-buttons__button_disabled');
          } else {
            minus.classList.add('dropdown-buttons__button_disabled');
          }
        }
      });
    });
  }
}

new DropdownButtons('#drop-1');
new DropdownButtons('#drop-2');
new DropdownButtons('#drop-3');

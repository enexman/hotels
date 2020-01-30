class CheckboxList {
  constructor(block) {
    this.container = block;
    this._defaultState();
    this._openList();
  }

  _defaultState() {
    this.title = this.container.querySelector('.js-checkbox-list__title');
    this.list = this.container.querySelector('.js-checkbox-list__list');
  }

  _openList() {
    this.title.addEventListener('click', () => {
      this.title.classList.toggle('checkbox-list__title_close');
      this.title.classList.toggle('checkbox-list__title_open');
      this.list.classList.toggle('checkbox-list__list_open');
    });
  }
}

const checkboxes = document.querySelectorAll('.js-checkbox-list');

Array.from(checkboxes).forEach(it => {
  new CheckboxList(it);
});
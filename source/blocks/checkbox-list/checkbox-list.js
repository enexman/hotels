export default class CheckboxList {
  constructor(id) {
    this.container = document.querySelector(id);
    if (!this.container) return;
    this.title = this.container.querySelector('.js-checkbox-list__title');
    this.list = this.container.querySelector('.js-checkbox-list__list');
    this._openList();
  }

  _openList() {
    this.title.addEventListener('click', () => {
      this.title.classList.toggle('checkbox-list__title_close');
      this.title.classList.toggle('checkbox-list__title_open');
      this.list.classList.toggle('checkbox-list__list_open');
    });
  }
}

new CheckboxList('#checkbox-first');
new CheckboxList('#checkbox-second');

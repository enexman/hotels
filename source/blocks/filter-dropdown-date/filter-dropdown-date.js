export default class FilterDropdownDate {
  constructor(input) {
    if (!input) return;
    this.input = input;
    const containerClassName = `.${input.parentNode.className} .card-calendar`;

    const options = this.getDates();

    const cardCalendarNode = document.querySelector(containerClassName);
    cardCalendarNode.classList.add('card-calendar_close');
    cardCalendarNode.querySelector('.js-card-calendar__title').textContent = options.title;

    const numbersNode = cardCalendarNode.querySelector('.js-card-calendar__numbers');
    const buttonClearNode = cardCalendarNode.querySelector('.js-card-calendar__button-clear');
    const buttonSubmitNode = cardCalendarNode.querySelector('.js-card-calendar__button-submit');

    this.drawDays(options.dates, numbersNode);

    numbersNode.addEventListener('click', (ev) => {
      if (options.dates.some((it) => it.endDate)) return;

      if (options.dates.some((it) => it.startDate)) {
        const start = options.dates.reduce((prev, it, idx) => {
          let previous = prev;
          if (it.startDate) {
            previous = idx;
          }
          return previous;
        }, 0);

        options.dates.forEach((item, idx) => {
          const it = item;
          if (
            it.number === +ev.target.textContent
            && it.month === +ev.target.dataset.month
            && start < idx) {
            it.endDate = true;
          }
        });

        const end = options.dates.reduce((previous, it, idx) => {
          let prev = previous;
          if (it.endDate) {
            prev = idx;
          }
          return prev;
        }, 0);

        for (let i = start + 1; i < end; i += 1) {
          options.dates[i].middleDate = true;
        }

        this.drawDays(options.dates, numbersNode);
      } else {
        options.dates.forEach(((item) => {
          const it = item;
          if (it.number === +ev.target.textContent && it.month === +ev.target.dataset.month) {
            it.startDate = true;
          }
        }));
        this.drawDays(options.dates, numbersNode);
      }
    });

    const clearDates = () => {
      options.dates.forEach((item) => {
        const it = item;
        it.startDate = false;
        it.middleDate = false;
        it.endDate = false;
      });
      this.drawDays(options.dates, numbersNode);
      this.input.value = '';
    };

    buttonClearNode.addEventListener('click', () => {
      clearDates();
    });

    buttonSubmitNode.addEventListener('click', () => {
      cardCalendarNode.classList.add('card-calendar_close');
      const start = options.dates.filter((it) => it.startDate)[0];
      const end = options.dates.filter((it) => it.endDate)[0];
      if (start && end && input) {
        this.input.value = `${start.number} ${this.getNameMonth(start.month).name} - ${end.number} ${this.getNameMonth(end.month).name}`;
      }
    });

    this.input.addEventListener('click', () => {
      cardCalendarNode.classList.remove('card-calendar_close');
    });
  }

  getNameMonth(num) {
    switch (num) {
      case 0: return { name: 'янв', longName: 'Январь' };
      case 1: return { name: 'фев', longName: 'Февраль' };
      case 2: return { name: 'мар', longName: 'Март' };
      case 3: return { name: 'апр', longName: 'Апрель' };
      case 4: return { name: 'май', longName: 'Май' };
      case 5: return { name: 'июн', longName: 'Июнь' };
      case 6: return { name: 'июл', longName: 'Июль' };
      case 7: return { name: 'авг', longName: 'Август' };
      case 8: return { name: 'сен', longName: 'Сентябрь' };
      case 9: return { name: 'окт', longName: 'Октябрь' };
      case 10: return { name: 'ноя', longName: 'Ноябрь' };
      case 11: return { name: 'дек', longName: 'Декабрь' };
      default: break;
    }
  }

  getDates() {
    const date = new Date();
    let day;

    if (date.getDay() % 7) {
      day = ((date.getDate() - date.getDay()) % 7) - 6;
    } else {
      day = 1;
    }

    const array = [];
    let k = 1;

    for (let i = day; k <= 35; i += 1) {
      k += 1;
      const objDate = new Date(date.getFullYear(), date.getMonth(), i);
      const number = objDate.getDate();
      const month = objDate.getMonth();
      const otherMonth = (i < 0);
      const today = number === new Date().getDate() && objDate.getMonth() === new Date().getMonth();
      const obj = {
        number, otherMonth, startDate: false, middleDate: false, endDate: false, month, today,
      };

      array.push(obj);
    }
    
    console.log('---', {
      title: `${this.getNameMonth(date.getMonth()).longName} ${date.getFullYear()}`,
      dates: array,
    })

    return {
      title: `${this.getNameMonth(date.getMonth()).longName} ${date.getFullYear()}`,
      dates: array,
    };
  }

  drawDays(options, containerNode) {
    const container = containerNode;
    container.innerHTML = '';
    options.forEach((it) => {
      const classes = ['card-calendar__number'];
      if (it.otherMonth) classes.push('card-calendar__number_empty');
      if (it.startDate) classes.push('card-calendar__number_start');
      if (it.middleDate) classes.push('card-calendar__number_middle');
      if (it.endDate) classes.push('card-calendar__number_end');
      if (it.today) classes.push('card-calendar__number_today');

      const day = document.createElement('div');
      day.classList.add(...classes);
      day.textContent = it.number;
      day.dataset.number = it.number;
      day.dataset.month = it.month;
      container.appendChild(day);
    });

    return container;
  }
}

new FilterDropdownDate(document.querySelector('.js-filter-dropdown-date__input'));

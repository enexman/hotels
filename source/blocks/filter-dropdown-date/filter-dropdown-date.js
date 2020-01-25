export default class FilterDropdownDate {
  constructor(input) {
    if (!input) return;
    this.inputNode = input;
    this.containerClassName = `.${input.parentNode.className} .card-calendar`;

    this.cardCalendarNode = document.querySelector(this.containerClassName);
    this.titleNode = this.cardCalendarNode.querySelector('.js-card-calendar__title');
    this.numbersNode = this.cardCalendarNode.querySelector('.js-card-calendar__numbers');
    this.buttonClearNode = this.cardCalendarNode.querySelector('.js-card-calendar__button-clear');
    this.buttonSubmitNode = this.cardCalendarNode.querySelector('.js-card-calendar__button-submit');
    this.buttonRightNode = this.cardCalendarNode.querySelector('.js-card-calendar__button_right');
    this.buttonLeftNode = this.cardCalendarNode.querySelector('.js-card-calendar__button_left');

    this.cardCalendarNode.classList.add('card-calendar_close');
    this.startDate = null;
    this.endDate = null;
    this.data = this.getDates(0);
    this.monthNumber = 0;
    this.drawTitle(this.data.title);
    this.drawDays(this.data.dates, this.numbersNode);

    this.buttonRightNode.addEventListener('click', () => {
      this.monthNumber += 1;
      this.updateCalendar();
    });

    this.buttonLeftNode.addEventListener('click', () => {
      this.monthNumber -= 1;
      this.updateCalendar();
    });

    this.numbersNode.addEventListener('click', this.onNumbersNodeClick.bind(this));

    this.buttonClearNode.addEventListener('click', () => {
      this.clearDates();
    });

    this.buttonSubmitNode.addEventListener('click', () => {
      this.cardCalendarNode.classList.add('card-calendar_close');
      if (this.startDate && this.endDate) {
        this.inputNode.value = `${this.startDate.date} ${this.getNameMonth(this.startDate.month).name} - ${this.endDate.date} ${this.getNameMonth(this.endDate.month).name}`;
      }
    });

    this.inputNode.addEventListener('click', this.onInputNodeClick.bind(this));
  }

  clearDates() {
    this.data.dates.forEach((item) => {
      const it = item;
      it.startDate = false;
      it.middleDate = false;
      it.endDate = false;
    });
    this.startDate = null;
    this.endDate = null;
    this.monthNumber = 0;
    this.drawDays(this.data.dates, this.numbersNode);
    this.inputNode.value = '';
  }

  onInputNodeClick() {
    this.cardCalendarNode.classList.toggle('card-calendar_close');
  }

  onNumbersNodeClick(ev) {
    const { year, month } = this.getDates(this.monthNumber);

    // если клик другой месяц
    if (ev.target.classList.contains('card-calendar__number_empty')) {
      for (let i = 0; i < this.data.dates.length; i += 1) {
        if (
          this.data.dates[i].number === +ev.target.textContent
          && this.data.dates[i].otherMonth
        ) {
          // если клик другой месяц вперед
          if (this.data.dates[i].month - 1 === month) {
            this.monthNumber += 1;
            this.updateCalendar();
            return;
          }
          if (this.data.dates[i].month === 0 && month === 11) {
            this.monthNumber += 1;
            this.updateCalendar();
            return;
          }

          // если клик другой месяц назад
          if (this.data.dates[i].month + 1 === month) {
            this.monthNumber -= 1;
            this.updateCalendar();
            return;
          }
          if (this.data.dates[i].month === 11 && month === 0) {
            this.monthNumber -= 1;
            this.updateCalendar();
            return;
          }
        }
      }
    }

    if (!this.startDate) {
      if (ev.target.classList.contains('card-calendar__number')) {
        this.startDate = {
          date: +ev.target.textContent,
          month,
          parse: Date.parse(new Date(year, month, +ev.target.textContent)),
        };

        this.writeStartDateData();
        this.drawDays(this.data.dates, this.numbersNode);
        return;
      }
    }

    // если есть старт дата и нет енд даты
    if (this.startDate && !this.endDate) {
      // если клик на нужный класс с цифрой
      if (ev.target.classList.contains('card-calendar__number')) {
        // если енд дата больше старт даты
        if (this.startDate.parse < Date.parse(new Date(year, month, +ev.target.textContent))) {
          this.endDate = {
            date: +ev.target.textContent,
            month,
            parse: Date.parse(new Date(year, month, +ev.target.textContent)),
          };
          this.writeEndDateData();
          this.writeMiddleDates();
          this.drawDays(this.data.dates, this.numbersNode);
        }
      }
    }
  }

  writeStartDateData() {
    if (!this.startDate) return;

    for (let i = 0; i < this.data.dates.length; i += 1) {
      if (this.startDate.parse === this.data.dates[i].parse) {
        this.data.dates[i].startDate = true;
      }
    }
  }

  writeEndDateData() {
    if (!this.endDate) return;

    for (let i = 0; i < this.data.dates.length; i += 1) {
      if (this.endDate.parse === this.data.dates[i].parse) {
        this.data.dates[i].endDate = true;
      }
    }
  }

  writeMiddleDates() {
    if (!this.endDate) return;
    for (let i = 0; i < this.data.dates.length; i += 1) {
      if (
        this.startDate.parse < this.data.dates[i].parse
        && this.data.dates[i].parse < this.endDate.parse
      ) {
        this.data.dates[i].middleDate = true;
      }
    }
  }

  updateCalendar() {
    this.data = this.getDates(this.monthNumber);
    this.writeStartDateData();
    this.writeEndDateData();
    this.writeMiddleDates();
    this.drawTitle(this.data.title);
    this.drawDays(this.data.dates, this.numbersNode);
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

  getDates(parameter = 0) {
    const monthPr = parameter;
    const dateNow = new Date();
    const firstDay = (new Date(dateNow.getFullYear(), monthPr, 1).getDay())
      ? new Date(dateNow.getFullYear(), monthPr, 1).getDay() - 2
      : new Date(dateNow.getFullYear(), monthPr, 1).getDay() + 5;
    const startDate = new Date(dateNow.getFullYear(), monthPr, -firstDay);

    const currentMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + monthPr).getMonth();
    const currentYear = new Date(dateNow.getFullYear(), dateNow.getMonth() + monthPr).getFullYear();

    const dates = [];

    const daysLength = (firstDay + this.calculateMonthLength(currentMonth) >= 35) ? 42 : 35;

    for (let i = 0; i < daysLength; i += 1) {
      const objDate = new Date(
        startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i,
      );
      const number = objDate.getDate();
      const month = objDate.getMonth();
      const otherMonth = (currentMonth !== objDate.getMonth());
      const today = (
        number === new Date().getDate() && objDate.getMonth() === new Date().getMonth()
      );
      const obj = {
        number,
        otherMonth,
        startDate: false,
        middleDate: false,
        endDate: false,
        month,
        today,
        parse: Date.parse(new Date(currentYear, month, number)),
      };

      dates.push(obj);
    }


    return {
      title: `${this.getNameMonth(currentMonth).longName} ${currentYear}`,
      dates,
      month: currentMonth,
      year: currentYear,
    };
  }

  calculateMonthLength(num) {
    switch (num) {
      case 0: return 31;
      case 1: return 29;
      case 2: return 31;
      case 3: return 30;
      case 4: return 31;
      case 5: return 30;
      case 6: return 31;
      case 7: return 31;
      case 8: return 30;
      case 9: return 31;
      case 10: return 30;
      case 11: return 31;
      default: break;
    }
  }

  drawDays(dates, containerNode) {
    const container = containerNode;
    container.innerHTML = '';
    dates.forEach((it) => {
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

  drawTitle(title) {
    this.titleNode.textContent = title;
  }
}

new FilterDropdownDate(document.querySelector('.js-filter-dropdown-date__input'));

class GroupDropdownDate {
  constructor(parent) {
    this.parentNode = parent;
    this._defaultState();
    this._addEventListeners();
  }

  _defaultState() {
    this.inputStartNode = this.parentNode.querySelector('.js-group-dropdown-date__input_left');
    this.inputEndNode = this.parentNode.querySelector('.js-group-dropdown-date__input_right');
    this.containerClassName = `.${this.parentNode.className.split(' ')[0]} .card-calendar`;

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
    this.data = this._getDates(0);
    this.monthNumber = 0;
    this._drawTitle(this.data.title);
    this._drawDays(this.data.dates, this.numbersNode);
  }

  _addEventListeners() {
    this.buttonRightNode.addEventListener('click', this._handleButtonRightNodeClick.bind(this));
    this.buttonLeftNode.addEventListener('click', this._handleButtonLeftNodeClick.bind(this));
    this.numbersNode.addEventListener('click', this._handleNumbersNodeClick.bind(this));
    this.buttonClearNode.addEventListener('click', this._handleButtonClearNodeClick.bind(this));
    this.buttonSubmitNode.addEventListener('click', this._handleButtonSubmitNodeClick.bind(this));
    this.inputStartNode.addEventListener('click', this._handleInputNodeClick.bind(this));
    this.inputEndNode.addEventListener('click', this._handleInputNodeClick.bind(this));
  }

  _clearDates() {
    this.data.dates.forEach((item) => {
      const it = item;
      it.startDate = false;
      it.middleDate = false;
      it.endDate = false;
    });
    this.startDate = null;
    this.endDate = null;
    this.monthNumber = 0;
    this._updateCalendar();
    this._drawDays(this.data.dates, this.numbersNode);
    this.inputStartNode.value = '';
    this.inputEndNode.value = '';
  }

  _handleButtonRightNodeClick() {
    this.monthNumber += 1;
    this._updateCalendar();
  }

  _handleButtonLeftNodeClick() {
    this.monthNumber -= 1;
    this._updateCalendar();
  }

  _handleButtonClearNodeClick() {
    this._clearDates();
  }

  _handleButtonSubmitNodeClick() {
    const pad = (n) => (n < 10 ? `0${n}` : n);

    this.cardCalendarNode.classList.add('card-calendar_close');
    if (this.startDate) {
      this.inputStartNode.value = `${pad(this.startDate.date)}.${pad(this.startDate.month + 1)}.${this.data.year}`;
    }
    if (this.endDate) {
      this.inputEndNode.value = `${pad(this.endDate.date)}.${pad(this.endDate.month + 1)}.${this.data.year}`;
    }
  }

  _handleInputNodeClick() {
    this.cardCalendarNode.classList.toggle('card-calendar_close');
  }

  _handleNumbersNodeClick(ev) {
    const { year, month } = this._getDates(this.monthNumber);

    if (ev.target.classList.contains('card-calendar__number_empty')) {
      for (let i = 0; i < this.data.dates.length; i += 1) {
        if (
          this.data.dates[i].number === +ev.target.textContent
          && this.data.dates[i].otherMonth
        ) {
          if (this.data.dates[i].month - 1 === month) {
            this.monthNumber += 1;
            this._updateCalendar();
            return;
          }
          if (this.data.dates[i].month === 0 && month === 11) {
            this.monthNumber += 1;
            this._updateCalendar();
            return;
          }

          if (this.data.dates[i].month + 1 === month) {
            this.monthNumber -= 1;
            this._updateCalendar();
            return;
          }
          if (this.data.dates[i].month === 11 && month === 0) {
            this.monthNumber -= 1;
            this._updateCalendar();
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

        this._writeStartDateData();
        this._drawDays(this.data.dates, this.numbersNode);
        return;
      }
    }
    
    if (this.startDate && !this.endDate) {
      if (ev.target.classList.contains('card-calendar__number')) {
        if (this.startDate.parse < Date.parse(new Date(year, month, +ev.target.textContent))) {
          this.endDate = {
            date: +ev.target.textContent,
            month,
            parse: Date.parse(new Date(year, month, +ev.target.textContent)),
          };
          this._writeEndDateData();
          this._writeMiddleDates();
          this._drawDays(this.data.dates, this.numbersNode);
        }
      }
    }
  }

  _writeStartDateData() {
    if (!this.startDate) return;

    for (let i = 0; i < this.data.dates.length; i += 1) {
      if (this.startDate.parse === this.data.dates[i].parse) {
        this.data.dates[i].startDate = true;
      }
    }
  }

  _writeEndDateData() {
    if (!this.endDate) return;

    for (let i = 0; i < this.data.dates.length; i += 1) {
      if (this.endDate.parse === this.data.dates[i].parse) {
        this.data.dates[i].endDate = true;
      }
    }
  }

  _writeMiddleDates() {
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

  _updateCalendar() {
    this.data = this._getDates(this.monthNumber);
    this._writeStartDateData();
    this._writeEndDateData();
    this._writeMiddleDates();
    this._drawTitle(this.data.title);
    this._drawDays(this.data.dates, this.numbersNode);
  }

  _getNameMonth(num) {
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

  _getDates(parameter = 0) {
    const monthPr = parameter;
    const dateNow = new Date();
    const firstDay = (new Date(dateNow.getFullYear(), monthPr, 1).getDay())
      ? new Date(dateNow.getFullYear(), monthPr, 1).getDay() - 2
      : new Date(dateNow.getFullYear(), monthPr, 1).getDay() + 5;
    const startDate = new Date(dateNow.getFullYear(), monthPr, -firstDay);

    const currentMonth = new Date(dateNow.getFullYear(), dateNow.getMonth() + monthPr).getMonth();
    const currentYear = new Date(dateNow.getFullYear(), dateNow.getMonth() + monthPr).getFullYear();

    const dates = [];

    const daysLength = (firstDay + this._calculateMonthLength(currentMonth) >= 35) ? 42 : 35;

    for (let i = 0; i < daysLength; i += 1) {
      const objDate = new Date(
        startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i,
      );
      const number = objDate.getDate();
      const month = objDate.getMonth();
      const otherMonth = (currentMonth !== objDate.getMonth());
      const today = (
        number === new Date().getDate()
        && objDate.getMonth() === new Date().getMonth()
        && objDate.getFullYear() === new Date().getFullYear()
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
      title: `${this._getNameMonth(currentMonth).longName} ${currentYear}`,
      dates,
      month: currentMonth,
      year: currentYear,
    };
  }

  _calculateMonthLength(num) {
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

  _drawDays(dates, containerNode) {
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

  _drawTitle(title) {
    this.titleNode.textContent = title;
  }
}

const groupDropdownDateFormElement = document.querySelector(
  '.js-main-form-elements__group-dropdown-date',
);
const groupDropdownDateCardFind = document.querySelector('.js-card-find');
const groupDropdownDateCardReserve = document.querySelector('.js-card-reserve');

if (groupDropdownDateFormElement) {
  new GroupDropdownDate(groupDropdownDateFormElement);
}

if (groupDropdownDateCardFind) {
  new GroupDropdownDate(groupDropdownDateCardFind);
}

if (groupDropdownDateCardReserve) {
  new GroupDropdownDate(groupDropdownDateCardReserve);
}

const getNameMonth = (num) => {
  switch (num) {
    case 0 : return {name: 'янв', longName: 'Январь'};
    case 1 : return {name: 'фев', longName: 'Февраль'};
    case 2 : return {name: 'мар', longName: 'Март'};
    case 3 : return {name: 'апр', longName: 'Апрель'};
    case 4 : return {name: 'май', longName: 'Май'};
    case 5 : return {name: 'июн', longName: 'Июнь'};
    case 6 : return {name: 'июл', longName: 'Июль'};
    case 7 : return {name: 'авг', longName: 'Август'};
    case 8 : return {name: 'сен', longName: 'Сентябрь'};
    case 9 : return {name: 'окт', longName: 'Октябрь'};
    case 10 : return {name: 'ноя', longName: 'Ноябрь'};
    case 11 : return {name: 'дек', longName: 'Декабрь'};
  }
};

const getDates = () => {
  const date = new Date();
  let day;

  if(date.getDay() % 7) {
    day = (date.getDate() - date.getDay()) % 7 - 6;
  } else {
    day = 1;
  }

  const array = [];
  let k = 1;

  for (let i = day; k <= 35; i++) {
    k++;
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

  return {
    title: getNameMonth(date.getMonth()).longName + ' ' + date.getFullYear(),
    dates: array
  };
};

const drawDays = (options, container) => {
  container.innerHTML = '';
  options.forEach(it => {
    const classes = ['card-calendar__number'];
    if (it.otherMonth) classes.push('card-calendar__number--empty');
    if (it.startDate) classes.push('card-calendar__number--start');
    if (it.middleDate) classes.push('card-calendar__number--middle');
    if (it.endDate) classes.push('card-calendar__number--end');
    if (it.today) classes.push('card-calendar__number--today');

    const day = document.createElement('div');
    day.classList.add(...classes);
    day.textContent = it.number;
    day.dataset.number = it.number;
    day.dataset.month = it.month;
    container.appendChild(day);
  });

  return container;
};

export const cardCalendar = (input) => {
  if(!input) return;

  const containerClassName = '.' + input.parentNode.className + ' .card-calendar';

  const options = getDates();

  const cardCalendarNode = document.querySelector(containerClassName);
  cardCalendarNode.classList.add('card-calendar--close');
  cardCalendarNode.querySelector('.card-calendar__title').textContent = options.title;

  const numbersNode = cardCalendarNode.querySelector('.card-calendar__numbers');
  const buttonClearNode = cardCalendarNode.querySelector('.card-calendar__button-clear');
  const buttonSubmitNode = cardCalendarNode.querySelector('.card-calendar__button-submit');
  const buttonRightNode = cardCalendarNode.querySelector('.card-calendar__button--right');
  const buttonLeftNode = cardCalendarNode.querySelector('.card-calendar__button--left');

  drawDays(options.dates, numbersNode);

  numbersNode.addEventListener('click', (ev) => {

    if(options.dates.some(it => it.endDate)) return;

    if (options.dates.some((it) => it.startDate)) {
      const start = options.dates.reduce((prev, it, idx) => {
        if (it.startDate) {
          prev = idx;
        }
        return prev
      }, 0);

      options.dates.forEach((it, idx) => {
        if (it.number == ev.target.textContent && it.month == ev.target.dataset.month && start < idx) {
          it.endDate = true;
        }
      });

      const end = options.dates.reduce((prev, it, idx) => {
        if (it.endDate) {
          prev = idx;
        }
        return prev
      }, 0);

      for(let i = start + 1; i < end; i++) {
        options.dates[i].middleDate = true;
      }

      drawDays(options.dates, numbersNode);

    } else {
      options.dates.forEach((it => {
        if (it.number == ev.target.textContent && it.month == ev.target.dataset.month) {
          it.startDate = true;
        }
      }));
      drawDays(options.dates, numbersNode);
    }
  });

  const clearDates = () => {
    options.dates.forEach(it => {
      it.startDate = false;
      it.middleDate = false;
      it.endDate = false;
    });
    drawDays(options.dates, numbersNode);
    input.value = '';
  };

  buttonRightNode.addEventListener('click', () => {});
  buttonLeftNode.addEventListener('click', () => {});


  buttonClearNode.addEventListener('click', () => {
    clearDates();
  });

  buttonSubmitNode.addEventListener('click', () => {
    cardCalendarNode.classList.add('card-calendar--close');
    const start = options.dates.filter(it => it.startDate)[0];
    const end = options.dates.filter(it => it.endDate)[0];
    if(start && end && input) {
      input.value = `${start.number} ${getNameMonth(start.month).name} - ${end.number} ${getNameMonth(end.month).name}`
    }
  });

  input.addEventListener('click', () => {
    cardCalendarNode.classList.remove('card-calendar--close')
  })
};

export const groupCardCalendar = (block) => {
  if(!block) return;
  
  const input = block.querySelector('.group-dropdown-date__input--left');
  const input2 = block.querySelector('.group-dropdown-date__input--right');

  const options = getDates();

  const cardCalendarNode = block.querySelector('.card-calendar');
  cardCalendarNode.classList.add('card-calendar--close');
  cardCalendarNode.querySelector('.card-calendar__title').textContent = options.title;

  const numbersNode = cardCalendarNode.querySelector('.card-calendar__numbers');
  const buttonClearNode = cardCalendarNode.querySelector('.card-calendar__button-clear');
  const buttonSubmitNode = cardCalendarNode.querySelector('.card-calendar__button-submit');
  const buttonRightNode = cardCalendarNode.querySelector('.card-calendar__button--right');
  const buttonLeftNode = cardCalendarNode.querySelector('.card-calendar__button--left');

  drawDays(options.dates, numbersNode);

  numbersNode.addEventListener('click', (ev) => {

    if(options.dates.some(it => it.endDate)) return;

    if (options.dates.some((it) => it.startDate)) {
      const start = options.dates.reduce((prev, it, idx) => {
        if (it.startDate) {
          prev = idx;
        }
        return prev
      }, 0);

      options.dates.forEach((it, idx) => {
        if (it.number == ev.target.textContent && it.month == ev.target.dataset.month && start < idx) {
          it.endDate = true;
        }
      });

      const end = options.dates.reduce((prev, it, idx) => {
        if (it.endDate) {
          prev = idx;
        }
        return prev
      }, 0);

      for(let i = start + 1; i < end; i++) {
        options.dates[i].middleDate = true;
      }

      drawDays(options.dates, numbersNode);

    } else {
      options.dates.forEach((it => {
        if (it.number == ev.target.textContent && it.month == ev.target.dataset.month) {
          it.startDate = true;
        }
      }));
      drawDays(options.dates, numbersNode);
    }
  });

  const clearDates = () => {
    options.dates.forEach(it => {
      it.startDate = false;
      it.middleDate = false;
      it.endDate = false;
    });
    drawDays(options.dates, numbersNode);
    input.value = '';
    input2.value = '';
  };

  buttonRightNode.addEventListener('click', () => {});
  buttonLeftNode.addEventListener('click', () => {});


  buttonClearNode.addEventListener('click', () => {
    clearDates();
  });

  const pad = (n) => n < 10 ? '0' + n : n;

  buttonSubmitNode.addEventListener('click', () => {
    cardCalendarNode.classList.add('card-calendar--close');
    const start = options.dates.filter(it => it.startDate)[0];
    const end = options.dates.filter(it => it.endDate)[0];
    if(start) {
      input.value = `${pad(start.number)}.${pad(start.month)}.${new Date().getFullYear()}`;
    }
    if(end) {
      input2.value = `${pad(end.number)}.${pad(end.month)}.${new Date().getFullYear()}`;
    }
  });

  input.addEventListener('click', () => {
    cardCalendarNode.classList.remove('card-calendar--close')
  });

  input2.addEventListener('click', () => {
    cardCalendarNode.classList.remove('card-calendar--close')
  });
};
const getDates = () => {
  return {
    title: 'Август 2019',
    dates: [
      {
        number: 29,
        otherMonth: true,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 30,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 31,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 1,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 2,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 3,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 4,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
      {
        number: 5,
        otherMonth: false,
        startDate: false,
        middleDate: false,
        endDate: false,
      },
    ]
  };
};

const createDays = (options, container) => {
  container.innerHTML = '';
  options.forEach(it => {
    const classes = ['card-calendar__number'];
    if (it.otherMonth) classes.push('card-calendar__number--empty');
    if (it.startDate) classes.push('card-calendar__number--start');
    if (it.middleDate) classes.push('card-calendar__number--middle');
    if (it.endDate) classes.push('card-calendar__number--end');

    const day = document.createElement('div');
    day.classList.add(...classes);
    day.textContent = it.number;
    day.dataset.number = it.number;
    container.appendChild(day);
  });

  return container;
};

const cardCalendar = (getOptions, days) => {
  const options = getOptions();

  document.querySelector('.card-calendar__title').textContent = options.title;
  const numbersNode = document.querySelector('.card-calendar__numbers');
  const buttonClearNode = document.querySelector('.card-calendar__button-clear');
  const buttonSubmitNode = document.querySelector('.card-calendar__button-submit');
  const cardCalendarNode = document.querySelector('.card-calendar');
  days(options.dates, numbersNode);

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
        if (it.number == ev.target.textContent && start < idx) {
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

      days(options.dates, numbersNode);

    } else {
      options.dates.forEach((it => {
        if (it.number == ev.target.textContent) {
          it.startDate = true;
        }
      }));
      days(options.dates, numbersNode);
    }
  });

  buttonClearNode.addEventListener('click', () => {
    options.dates.forEach(it => {
      it.startDate = false;
      it.middleDate = false;
      it.endDate = false;
    });
    days(options.dates, numbersNode);
  });

  buttonSubmitNode.addEventListener('click', () => {
    cardCalendarNode.classList.add('card-calendar--close')
  })
};

cardCalendar(getDates, createDays);
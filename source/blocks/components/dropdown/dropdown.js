
const dropdown = (blockId) => {
  const blockNode = document.querySelector(blockId);
  if (!blockNode) return;

  const listNode = blockNode.querySelector('.dropdown__list');
  listNode.classList.remove('dropdown__list--open');
  const liNodes = blockNode.querySelectorAll('.dropdown__option');

  const inputNode = blockNode.querySelector('.dropdown__text');

  inputNode.addEventListener('click', () => {
    listNode.classList.toggle('dropdown__list--open');
  });
  

  let bedRoom = 0;
  let bed = 0;
  let bathRoom = 0;

  Array.from(liNodes).forEach((it, idx) => {
    const numeric = it.querySelector('.dropdown__numeric');
    const minus = it.querySelector('.dropdown__button--minus');
    const liText = it.querySelector('.dropdown__option-text');
    it.addEventListener('click', (ev) => {
      switch (idx) {
        case 0 : bedRoom = +numeric.textContent;
          break;
        case 1 : bed = +numeric.textContent;
          break;
        case 2 : bathRoom = +numeric.textContent;
          break;
      }
      if(ev.target.classList.contains('dropdown__button--plus')) {
        numeric.textContent =  +numeric.textContent + 1;
        switch (idx) {
          case 0 : bedRoom += 1;
            break;
          case 1 : bed += 1;
            break;
          case 2 : bathRoom += 1;
            break;
        }

        let bedRooms = bedRoom ? ', ' + bedRoom + ' ' + liText.textContent + ' ' : '';
        let beds = bed ? ', ' + bed + ' ' + liText.textContent  + ' ' : '';
        let bathRooms = bathRoom ? ', ' + bathRoom + ' ' + liText.textContent  + ' ' : '';
        inputNode.value = (bedRooms + beds + bathRooms).slice(2, -1);

      }
      if(ev.target.classList.contains('dropdown__button--minus')) {
        if (!+numeric.textContent) return;
        numeric.textContent =  +numeric.textContent - 1;
        switch (idx) {
          case 0 : bedRoom -= 1;
            break;
          case 1 : bed -= 1;
            break;
          case 2 : bathRoom -= 1;
            break;
        }
        let bedRooms = bedRoom ? ', ' + bedRoom + ' ' + liText.textContent + ' ' : '';
        let beds = bed ? ', ' + bed + ' ' + liText.textContent  + ' ' : '';
        let bathRooms = bathRoom ? ', ' + bathRoom + ' ' + liText.textContent  + ' ' : '';
        inputNode.value = (bedRooms + beds + bathRooms).slice(2, -1);

      }

      if(numeric) {
        if (+numeric.textContent) {
          minus.classList.remove('dropdown__button--disabled');
        } else {
          minus.classList.add('dropdown__button--disabled');
        }
      }

    });
  });
};

dropdown('#dropJS');
dropdown('#drop-search');
dropdown('#drop-search2');

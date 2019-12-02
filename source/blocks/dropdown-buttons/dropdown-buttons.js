
const dropdownButtons = (blockId) => {
  const blockNode = document.querySelector(blockId);
  const listNode = blockNode.querySelector('.dropdown-buttons__list');
  const liNodes = blockNode.querySelectorAll('.dropdown-buttons__option');
  const submitNode = blockNode.querySelector('.dropdown-buttons__button-bottom--submit');
  const clearNode = blockNode.querySelector('.dropdown-buttons__button-bottom--clear');
  
  const inputNode = blockNode.querySelector('.dropdown-buttons__input');

  inputNode.addEventListener('click', () => {
    listNode.classList.toggle('dropdown-buttons__list--open');
  });


  if (clearNode) {
    clearNode.style.display = 'none';
  }

  let guest = 0;
  let baby = 0;

  submitNode.addEventListener('click', () => {
    const babyInput = baby ? ', ' + baby + ' младенец': '';
    inputNode.value = guest + ' гостя' + babyInput;
  });

  if(clearNode) {

    clearNode.addEventListener('click', () => {
      inputNode.value = '';
      guest = 0;
      baby = 0;
      Array.from(liNodes).forEach(it => {
        const item = it.querySelector('.dropdown-buttons__numeric');
        if(item) item.textContent = ' 0 ';

        const minus = it.querySelector('.dropdown-buttons__button--minus');
        if (minus) {
          minus.classList.add('dropdown-buttons__button--disabled');
        }
      });
    });
  }

  Array.from(liNodes).forEach((it, idx) => {
    const numeric = it.querySelector('.dropdown-buttons__numeric');
    const minus = it.querySelector('.dropdown-buttons__button--minus');
    it.addEventListener('click', (ev) => {
      if(ev.target.classList.contains('dropdown-buttons__button--plus')) {
        numeric.textContent =  +numeric.textContent + 1;
        if (idx === 2) {
          baby += 1;
        } else {
          guest += 1
        }
      }
      if(ev.target.classList.contains('dropdown-buttons__button--minus')) {
        if (!+numeric.textContent) return;
        numeric.textContent =  +numeric.textContent - 1;
        if (idx === 2) {
          baby -= 1;
        } else {
          guest -= 1
        }
      }

      if(!guest && !baby) {
        clearNode.style.display = 'none';
      } else {
        clearNode.style.display = '';
      }

      if(numeric) {
        if (+numeric.textContent) {
          minus.classList.remove('dropdown-buttons__button--disabled');
        } else {
          minus.classList.add('dropdown-buttons__button--disabled');
        }
      }
    });
  });
};

dropdownButtons('#drop-1');
// dropdownButtons('#drop-2', true);
// dropdownButtons('#drop-3', true);

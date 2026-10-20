document.addEventListener('DOMContentLoaded', () => {
  const items = ['Item'];
  const listElement = document.querySelector('ul.my_list');
  const addItemBtn = document.querySelector('#add_item');
  const removeItemBtn = document.querySelector('#remove_item');
  const clearListBtn = document.querySelector('#clear_list');

  const render = () => {
    if (!listElement) {
      return;
    }
    listElement.innerHTML = '';
    for (const item of items) {
      const li = document.createElement('li');
      li.textContent = item;
      listElement.appendChild(li);
    }
  };

  if (addItemBtn) {
    addItemBtn.addEventListener('click', () => {
      items.push('Item');
      render();
    });
  }

  if (removeItemBtn) {
    removeItemBtn.addEventListener('click', () => {
      if (items.length > 0) {
        items.pop();
        render();
      }
    });
  }

  if (clearListBtn) {
    clearListBtn.addEventListener('click', () => {
      items.length = 0;
      render();
    });
  }
});

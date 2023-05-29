import './style.css';

export const ListItem = (props) => {
  const { day, item, expanded } = props;
  const { id, done, product, amount, unit } = item || {};

  let tickClass = '';
  if (done) {
    tickClass = ' btn-tick--on';
  }

  const element = document.createElement('div');
  element.classList.add('list-item');

  if (expanded) {
    element.classList.add('list-item--expanded');
  }

  element.innerHTML = `
    <div class="list-item__toolbar">
      Tlačítka
    </div>
    <button class="icon-btn btn-tick${tickClass}"></button>
    <div class="list-item__body">
      <div class="list-item__product">${product}</div>
      <div class="list-item__amount">${amount} ${unit}</div>
    </div>
    <div class="list-item__detail">
      <form>
        <div class="form-fields">
          <input class="field-input product-input" value="${product}" />
          <input class="field-input amount-input" value="${amount}" />
          <input class="field-input unit-input" value="${unit}" />
        </div>
        <div class="form-controls">
          <button class="btn-confirm">Potvrdit</button>
        </div>
      </form>
    </div>
    <div class="list-item__menu">
      <button class="icon-btn btn-menu"></button>
    </div>
  `;

  const handleTick = () => {
    fetch(`https://nakupy.kodim.app/api/me/week/${day}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        done: !done,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        element.replaceWith(
          ListItem(
            { day, item: data.result }
          )
        );
      });
  };

  element.querySelector('.btn-tick').addEventListener('click', handleTick);

  const handleMenu = () => {
    element.replaceWith(ListItem({
      day,
      id: id,
      item: item,
      expanded: !expanded
    }))
  };

  element.querySelector('.btn-menu').addEventListener('click', handleMenu);

  const updateItem = (event) => {
    event.preventDefault();

    const productInput = element.querySelector('.product-input');
    const amountInput = element.querySelector('.amount-input');
    const unitInput = element.querySelector('.unit-input');

    fetch(`https://nakupy.kodim.app/api/me/week/${day}/items/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        product: productInput.value,
        amount: Number(amountInput.value),
        unit: unitInput.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        element.replaceWith(
          ListItem(
            {
              day,
              item: data.result,
              expanded
            }
          )
        );
      });
  }

  element.querySelector('form').addEventListener('submit', updateItem);

  return element;
};
import { CreateElement } from './modules/feature_functions.js';
import { buttons } from './modules/buttons.js';

const listBtns = document.querySelector('.list-buttons');
buttons.map((button) => {
    const col = CreateElement('div', ['col', 'col-2']);
    const btn = CreateElement('button', ['btn', 'btn-primary', 'w-100']);
    const a = document.createElement('a');
    a.href = button.url;
    a.textContent = button.name;
    a.style.textDecoration = 'none';
    a.style.color = 'white';
    btn.appendChild(a);
    col.appendChild(btn);
    listBtns.appendChild(col);
});

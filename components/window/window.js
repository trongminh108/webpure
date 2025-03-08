import { getNumRanInt } from '../../modules/feature_functions.js';

export function Init(node, id, title = '', content = '') {
    const width = window.innerWidth * 0.3;
    const height = (width * 3) / 5;
    const posX = getNumRanInt(0, window.innerWidth - width);
    const posY = getNumRanInt(0, window.innerHeight - height);

    node.id = 'window-' + id;
    node.style.top = posY;
    node.style.left = posX;

    node.querySelector('.close').addEventListener('click', (e) => {
        CloseWindow(e, node);
    });
    node.querySelector('.hide').addEventListener('click', (e) => {
        HideWindow(e, node);
    });
    node.querySelector('.zoom').addEventListener('click', (e) => {
        ZoomWindow(e, node);
    });

    node.querySelector('#title').innerHTML = title;
    node.querySelector('.content').innerHTML = content;
}

function CloseWindow(event, win) {
    win.style.transition = 'transform 0.3s ease-out';
    win.style.transform = 'scale(0)';
    setTimeout(() => {
        win.remove();
    }, 200);
}

function HideWindow(event, win) {
    win.style.display = 'none';
}

function ZoomWindow(event, win) {
    if (win.style.width === '100vw') {
        win.style.width = '360px';
        win.style.height = '240px';
    } else {
        win.style.width = '100vw';
        win.style.height = '100vh';
    }
}

import {
    BACKGROUND,
    FOREST,
    PRIMARY,
    SECONDARY,
} from '../../constants/palette.js';

export function Init() {
    const container = document.querySelector('#header-container');
    container.style.backgroundColor = FOREST[BACKGROUND];

    const title = container.querySelector('#web-title');
    title.style.color = FOREST[PRIMARY];
    title.href = './';
}

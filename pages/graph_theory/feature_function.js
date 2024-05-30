import { EDGE, PX, VERTEX, VERTEX_RADIUS } from './constants.js';

export function CreateVertex(pos, color = 'red') {
    const vertex = document.createElement('div');
    vertex.classList.add(VERTEX);
    vertex.style.backgroundColor = color;
    vertex.style.left = pos.x + PX;
    vertex.style.top = pos.y + PX;

    return vertex;
}

export function CreateEdge(length, pos, angle, color = 'black') {
    const edge = document.createElement('div');
    edge.classList.add(EDGE);
    edge.style.width = length + 'px';
    edge.style.transform = `rotate(${angle}deg)`;
    edge.style.top = pos.y + 'px';
    edge.style.left = pos.x + 'px';
    return edge;
}

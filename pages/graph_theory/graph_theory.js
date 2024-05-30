import { EDGE, VERTEX, VERTEX_RADIUS } from './constants.js';
import { CreateEdge, CreateVertex } from './feature_function.js';

function Generate() {
    const screen = document.querySelector('.draw-screen');

    screen.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
    screen.addEventListener('mousedown', (e) => {
        handleClickDrawVertex(screen, e);
    });

    screen.addEventListener('mousedown', (e) => handleOnMouseDown(screen, e));
    screen.addEventListener('mouseup', handleOnMouseUp);

    // const cancelListener = getPositionOnRightClick(
    //     screen,
    //     (startPos, endPos) => {
    //         console.log('Start Position:', startPos);
    //         console.log('End Position:', endPos);
    //         handleCreateEdge(screen, startPos, endPos);
    //     }
    // );
}

Generate();

function handleClickDrawVertex(screen, event) {
    if (event.target.className !== VERTEX && event.button === 0) {
        const pos = {
            x: event.offsetX - VERTEX_RADIUS,
            y: event.offsetY - VERTEX_RADIUS,
        };
        const vertex = CreateVertex(pos);
        // vertex.addEventListener('mousedown', (event) =>
        //     handleClickVertex(screen, event)
        // );
        console.log('vertex: ', pos);
        screen.appendChild(vertex);
    }
}

function handleCreateEdge(screen, posA, posB) {
    const length = Math.sqrt((posB.x - posA.x) ** 2 + (posB.y - posA.y) ** 2);
    const angle =
        (Math.atan2(posB.y - posA.y, posB.x - posA.x) * 180) / Math.PI;

    const edge = CreateEdge(length, posA, angle);
    screen.appendChild(edge);
}

let startPos = null;
function handleOnMouseDown(screen, event) {
    const className = event.target.className;
    if ((className === VERTEX || className === EDGE) && event.button === 2) {
        startPos = {
            x: event.target.offsetLeft + VERTEX_RADIUS,
            y: event.target.offsetTop + VERTEX_RADIUS,
        };
        isDrawingEdge = true;
        // console.log('start: ', startPos);
    }
}

function handleOnMouseUp(event) {
    const className = event.target.className;
    if ((className === VERTEX || className === EDGE) && startPos) {
        const screen = document.querySelector('.draw-screen');
        const endPos = {
            x: event.target.offsetLeft + VERTEX_RADIUS,
            y: event.target.offsetTop + VERTEX_RADIUS,
        };
        console.log('end: ', endPos);
        handleCreateEdge(screen, startPos, endPos);
        startPos = null;
    }
    startPos = null;
}

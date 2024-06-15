import { FOREST } from '../../constants/palette.js';
import { getNumRanInt } from '../../modules/feature_functions.js';
import { CIRCLE } from './circle.js';
import { MOVE, VERTEX, EDGE, CLEAR } from './constants.js';

// Canvas
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;
canvas.style.border = '5px solid red';
canvas.style.backgroundColor = 'black';

const vertexes = [];
const RADIUS = 10;
const SPEED = 2;

//navbar
const navbar = document.querySelector('#navbar');
navbar.style.backgroundColor = FOREST['headerFooter'];
const btns = navbar.querySelectorAll('.btn');
btns.forEach((btn) => {
    btn.querySelector('i').addEventListener('click', (e) => {
        e.stopPropagation();
        handleBtnClick(btn);
    });
    btn.addEventListener('click', (e) => handleBtnClick(btn));
});
let currentBtn = btns[0];
ToggleButton(currentBtn);

//Animation
function resolveCollision(ball1, ball2) {
    const xVelocityDiff = ball1.dx - ball2.dx;
    const yVelocityDiff = ball1.dy - ball2.dy;
    const xDist = ball2.x - ball1.x;
    const yDist = ball2.y - ball1.y;

    // Prevent accidental overlap of balls
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(ball2.y - ball1.y, ball2.x - ball1.x);

        const u1 = rotate(ball1.dx, ball1.dy, angle);
        const u2 = rotate(ball2.dx, ball2.dy, angle);

        const v1 = { x: u2.x, y: u1.y };
        const v2 = { x: u1.x, y: u2.y };

        const finalVel1 = rotate(v1.x, v1.y, -angle);
        const finalVel2 = rotate(v2.x, v2.y, -angle);

        ball1.dx = finalVel1.x;
        ball1.dy = finalVel1.y;
        ball2.dx = finalVel2.x;
        ball2.dy = finalVel2.y;
    }
}

function rotate(dx, dy, angle) {
    return {
        x: dx * Math.cos(angle) - dy * Math.sin(angle),
        y: dx * Math.sin(angle) + dy * Math.cos(angle),
    };
}

function Animation() {
    context.clearRect(0, 0, width, height);
    vertexes.forEach((vertex, index) => {
        vertex.draw();
        vertex.update(width, height);
        for (let i = index + 1; i < vertexes.length; i++) {
            if (vertex.isCollision(vertexes[i])) {
                resolveCollision(vertex, vertexes[i]);
            }
        }
    });
    context.font = '16px black';
    context.fillText(vertexes.length, 21, 21);
    requestAnimationFrame(Animation);
}

function ToggleButton(btn) {
    btn.classList.toggle('btn-danger');
    btn.classList.toggle('btn-outline-danger');
}

function handleBtnClick(btn) {
    const id = btn.id;

    switch (id) {
        case MOVE:
            handleClickMoveButton();
            break;
        case VERTEX:
            handleClickVertexButton();
            break;
        case EDGE:
            handleClickEdgeButton();
            break;
        case CLEAR:
            handleClickClearButton();
            break;
        default:
            break;
    }

    if (id != CLEAR) {
        ToggleButton(currentBtn);
        ToggleButton(btn);
        currentBtn = btn;
    }
}

function handleClickMoveButton() {
    canvas.style.cursor = '';
}

function handleClickVertexButton() {
    canvas.style.cursor = 'pointer';
}

function handleClickEdgeButton() {}

function handleClickClearButton() {
    context.clearRect(0, 0, width, height);
    vertexes.length = 0;
}

function CreateVertex(x, y) {
    const pos = { x: x, y: y };
    let isInVertex = false;
    const radius = getNumRanInt(15, 25);
    for (const vertex of vertexes) {
        if (vertex.isOverlapping(pos, radius)) {
            console.log('[VERTEX]: ', vertex);
            isInVertex = true;
        }
    }
    if (!isInVertex) {
        const vertex = new CIRCLE(
            context,
            x,
            y,
            radius,
            vertexes.length + 1,
            SPEED
        );
        vertex.draw();
        vertexes.push(vertex);
        console.log(vertex);
    }
}

function Init() {
    canvas.addEventListener('mousedown', (event) => {
        switch (currentBtn.id) {
            case VERTEX:
                CreateVertex(event.offsetX, event.offsetY);
                break;

            default:
                break;
        }
    });

    //Animation
    Animation();
}

Init();

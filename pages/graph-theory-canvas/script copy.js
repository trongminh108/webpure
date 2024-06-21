import { FOREST } from '../../constants/palette.js';
import { CIRCLE } from './circle.js';
import { EDGE } from './edge.js';
import {
    MOVE,
    VERTEX,
    EDGE_BUTTON,
    CLEAR,
    UNDIRECTED_GRAPH,
    UNWEIGHTED_GRAPH,
    DIRECTED_GRAPH,
} from './constants.js';
import {
    SelectOption,
    getDistancePoints,
} from '../../modules/feature_functions.js';
class GRAPH_THEORY {
    constructor() {}
}
// Canvas
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');

const width = 500;
const height = 500;

canvas.width = width;
canvas.height = height;
canvas.style.border = '5px solid red';

const vertexes = [];
const graph = [];
const RADIUS = 15;
const type_graph = { directed: UNDIRECTED_GRAPH, weighted: UNWEIGHTED_GRAPH };

//navbar
const navbar = document.querySelector('#navbar');
navbar.style.backgroundColor = FOREST['headerFooter'];
const buttons = navbar.querySelectorAll('.btn');
buttons.forEach((btn) => {
    btn.querySelector('i').addEventListener('click', (e) => {
        e.stopPropagation();
        handleBtnClick(btn);
    });
    btn.addEventListener('click', (e) => handleBtnClick(btn));
});
let currentBtn = buttons[0];
ToggleButton(currentBtn);
let isDragging = false;
let currentVertex = null;
let edge = {};

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
        case EDGE_BUTTON:
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
    ClearScreen();
    vertexes.length = 0;
    graph.length = 0;
}

function handleChangeSelectDirected(e) {
    const type = e.target.value;
    if (type_graph.directed != type) {
        type_graph.directed = type;
        UpdateGraph();
    }
}

function CreateVertex(x, y) {
    const pos = { x: x, y: y };
    let isInVertex = false;
    for (const vertex of vertexes) {
        if (vertex.isOverlapping(pos, RADIUS)) {
            isInVertex = true;
        }
    }
    if (!isInVertex) {
        const vertex = new CIRCLE(context, x, y, RADIUS, vertexes.length + 1);
        vertexes.push(vertex);

        if (graph.length != 0) {
            graph.forEach((ver, index) => {
                if (index < graph.length) ver.push(0);
            });
            graph.push(new Array(vertexes.length).fill(0));
        } else graph.push([0]);

        UpdateGraph();
    }
}

function ClearScreen() {
    context.clearRect(0, 0, width, height);
}

function UpdateGraph() {
    ClearScreen();
    if (Object.keys(edge).length === 2) {
        const e = new EDGE(context, edge.p1.pos, edge.p2.pos);
        if (type_graph.directed === UNDIRECTED_GRAPH) e.draw();
        else if (type_graph.directed === DIRECTED_GRAPH) e.draw_arrow(0);
    }
    graph.forEach((row, i) => {
        row.forEach((col, j) => {
            if (col === 1) {
                const vi = vertexes[i];
                const vj = vertexes[j];
                const p1 = { x: vi.x, y: vi.y };
                const p2 = { x: vj.x, y: vj.y };
                const e = new EDGE(context, p1, p2);
                if (type_graph.directed === UNDIRECTED_GRAPH) e.draw();
                else if (type_graph.directed === DIRECTED_GRAPH)
                    e.draw_arrow(vertexes[0].radius);
            }
        });
    });
    vertexes.forEach((ver, index) => {
        ver.draw();
    });
}

function MoveVertex(pos) {
    vertexes.some((vertex, index) => {
        if (vertex.isOverlapping(pos, RADIUS)) {
            isDragging = true;
            currentVertex = index;
            return true;
        }
        return false;
    });
}

function DrawEdge(pos) {
    const min = { value: width * height, index: -1 };
    vertexes.forEach((ver, index) => {
        const p2 = { x: ver.x, y: ver.y };
        const distance = getDistancePoints(pos, p2);
        if (distance < min.value) {
            min.value = distance;
            min.index = index;
        }
    });
    const sp = { x: vertexes[min.index].x, y: vertexes[min.index].y };
    edge.p1 = { pos: sp, index: min.index };
}

function Init() {
    canvas.addEventListener('mousedown', (event) => {
        const pos = { x: event.offsetX, y: event.offsetY };
        switch (currentBtn.id) {
            case VERTEX:
                CreateVertex(event.offsetX, event.offsetY);
                break;
            case MOVE:
                MoveVertex(pos);
                break;
            case EDGE_BUTTON:
                DrawEdge(pos);
                break;

            default:
                break;
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        const pos = { x: event.offsetX, y: event.offsetY };
        if (isDragging && currentVertex != null) {
            vertexes[currentVertex].clear();
            vertexes[currentVertex].x = pos.x;
            vertexes[currentVertex].y = pos.y;
            UpdateGraph();
        }

        if (currentBtn.id === VERTEX) {
            const isInVer = vertexes.some((ver) => ver.isInCircle(pos));
            if (isInVer) canvas.style.cursor = 'pointer';
            else canvas.style.cursor = '';
        } else if (
            currentBtn.id === EDGE_BUTTON &&
            Object.keys(edge).length >= 1
        ) {
            edge.p2 = { pos: pos, index: -1 };
            UpdateGraph();
        }
    });

    canvas.addEventListener('mouseup', (event) => {
        const pos = { x: event.offsetX, y: event.offsetY };
        if (currentBtn.id === MOVE && isDragging) {
            isDragging = false;
            currentVertex = null;
        } else if (
            currentBtn.id === EDGE_BUTTON &&
            Object.keys(edge).length === 2
        ) {
            const min = { value: width * height, index: -1 };
            vertexes.forEach((ver, index) => {
                const p2 = { x: ver.x, y: ver.y };
                const distance = getDistancePoints(pos, p2);
                if (distance < min.value) {
                    min.value = distance;
                    min.index = index;
                }
            });
            if (edge.p1.index != min.index) graph[edge.p1.index][min.index] = 1;
            console.log('[GRAPH]: ', graph);
            edge = {};
            UpdateGraph();
        }
    });

    const selectDirected = navbar.querySelector('#selectDirected');
    selectDirected.addEventListener('change', handleChangeSelectDirected);
}

Init();

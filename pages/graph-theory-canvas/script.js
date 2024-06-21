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
    constructor(width, height) {
        this.canvas = document.querySelector('#canvas');
        this.context = canvas.getContext('2d');

        this.width = width;
        this.height = height;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.style.border = '5px solid red';

        this.vertexes = [];
        this.graph = [];
        this.RADIUS = 15;
        this.type_graph = {
            directed: UNDIRECTED_GRAPH,
            weighted: UNWEIGHTED_GRAPH,
        };

        //navbar
        this.navbar = document.querySelector('#navbar');
        this.navbar.style.backgroundColor = FOREST['headerFooter'];
        this.buttons = this.navbar.querySelectorAll('.btn');
        this.buttons.forEach((btn) => {
            btn.querySelector('i').addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleBtnClick(btn);
            });
            btn.addEventListener('click', (e) => this.handleBtnClick(btn));
        });
        this.currentBtn = this.buttons[0];
        this.ToggleButton(this.currentBtn);
        this.isDragging = false;
        this.currentVertex = null;
        this.edge = {};
    }

    ToggleButton(btn) {
        btn.classList.toggle('btn-danger');
        btn.classList.toggle('btn-outline-danger');
    }

    handleBtnClick(btn) {
        const id = btn.id;
        switch (id) {
            case MOVE:
                this.handleClickMoveButton();
                break;
            case VERTEX:
                this.handleClickVertexButton();
                break;
            case EDGE_BUTTON:
                this.handleClickEdgeButton();
                break;
            case CLEAR:
                this.handleClickClearButton();
                break;
            default:
                break;
        }

        if (id != CLEAR) {
            this.ToggleButton(this.currentBtn);
            this.ToggleButton(btn);
            this.currentBtn = btn;
        }
    }

    handleClickMoveButton() {
        this.canvas.style.cursor = '';
    }

    handleClickVertexButton() {
        this.canvas.style.cursor = 'pointer';
    }

    handleClickEdgeButton() {}

    handleClickClearButton() {
        this.ClearScreen();
        this.vertexes.length = 0;
        this.graph.length = 0;
    }

    handleChangeSelectDirected(e) {
        const type = e.target.value;
        if (this.type_graph.directed != type) {
            this.type_graph.directed = type;
            this.UpdateGraph();
        }
    }

    CreateVertex(x, y) {
        const pos = { x: x, y: y };
        let isInVertex = false;
        for (const vertex of this.vertexes) {
            if (vertex.isOverlapping(pos, this.RADIUS)) {
                isInVertex = true;
            }
        }
        if (!isInVertex) {
            const vertex = new CIRCLE(
                this.context,
                x,
                y,
                this.RADIUS,
                this.vertexes.length + 1
            );
            this.vertexes.push(vertex);

            if (this.graph.length != 0) {
                this.graph.forEach((ver, index) => {
                    if (index < this.graph.length) ver.push(0);
                });
                this.graph.push(new Array(this.vertexes.length).fill(0));
            } else this.graph.push([0]);

            this.UpdateGraph();
        }
    }

    ClearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    UpdateGraph() {
        this.ClearScreen();
        if (Object.keys(this.edge).length === 2) {
            const e = new EDGE(
                this.context,
                this.edge.p1.pos,
                this.edge.p2.pos
            );
            if (this.type_graph.directed === UNDIRECTED_GRAPH) e.draw();
            else if (this.type_graph.directed === DIRECTED_GRAPH)
                e.draw_arrow(0);
        }
        this.graph.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col === 1) {
                    const vi = this.vertexes[i];
                    const vj = this.vertexes[j];
                    const p1 = { x: vi.x, y: vi.y };
                    const p2 = { x: vj.x, y: vj.y };
                    const e = new EDGE(this.context, p1, p2);
                    if (this.type_graph.directed === UNDIRECTED_GRAPH) e.draw();
                    else if (this.type_graph.directed === DIRECTED_GRAPH)
                        e.draw_arrow(this.vertexes[0].radius);
                }
            });
        });
        this.vertexes.forEach((ver, index) => {
            ver.draw();
        });
    }

    MoveVertex(pos) {
        this.vertexes.some((vertex, index) => {
            if (vertex.isOverlapping(pos, this.RADIUS)) {
                this.isDragging = true;
                this.currentVertex = index;
                return true;
            }
            return false;
        });
    }

    DrawEdge(pos) {
        const min = { value: this.width * this.height, index: -1 };
        this.vertexes.forEach((ver, index) => {
            const p2 = { x: ver.x, y: ver.y };
            const distance = getDistancePoints(pos, p2);
            if (distance < min.value) {
                min.value = distance;
                min.index = index;
            }
        });
        const sp = {
            x: this.vertexes[min.index].x,
            y: this.vertexes[min.index].y,
        };
        this.edge.p1 = { pos: sp, index: min.index };
    }

    Init() {
        this.canvas.addEventListener('mousedown', (event) => {
            const pos = { x: event.offsetX, y: event.offsetY };
            switch (this.currentBtn.id) {
                case VERTEX:
                    this.CreateVertex(event.offsetX, event.offsetY);
                    break;
                case MOVE:
                    this.MoveVertex(pos);
                    break;
                case EDGE_BUTTON:
                    this.DrawEdge(pos);
                    break;

                default:
                    break;
            }
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const pos = { x: event.offsetX, y: event.offsetY };
            if (this.isDragging && this.currentVertex != null) {
                this.vertexes[this.currentVertex].clear();
                this.vertexes[this.currentVertex].x = pos.x;
                this.vertexes[this.currentVertex].y = pos.y;
                UpdateGraph();
            }

            if (this.currentBtn.id === VERTEX) {
                const isInVer = this.vertexes.some((ver) =>
                    ver.isInCircle(pos)
                );
                if (isInVer) this.canvas.style.cursor = 'pointer';
                else this.canvas.style.cursor = '';
            } else if (
                this.currentBtn.id === EDGE_BUTTON &&
                Object.keys(this.edge).length >= 1
            ) {
                this.edge.p2 = { pos: pos, index: -1 };
                this.UpdateGraph();
            }
        });

        this.canvas.addEventListener('mouseup', (event) => {
            const pos = { x: event.offsetX, y: event.offsetY };
            if (this.currentBtn.id === MOVE && this.isDragging) {
                this.isDragging = false;
                this.currentVertex = null;
            } else if (
                this.currentBtn.id === EDGE_BUTTON &&
                Object.keys(this.edge).length === 2
            ) {
                const min = { value: this.width * this.height, index: -1 };
                this.vertexes.forEach((ver, index) => {
                    const p2 = { x: ver.x, y: ver.y };
                    const distance = getDistancePoints(pos, p2);
                    if (distance < min.value) {
                        min.value = distance;
                        min.index = index;
                    }
                });
                if (this.edge.p1.index != min.index)
                    this.graph[this.edge.p1.index][min.index] = 1;
                console.log('[GRAPH]: ', this.graph);
                this.edge = {};
                this.UpdateGraph();
            }
        });

        const selectDirected = this.navbar.querySelector('#selectDirected');
        selectDirected.addEventListener('change', (e) =>
            this.handleChangeSelectDirected(e)
        );
    }
}

const canvasContainer = document.querySelector('#canvas-container');
const width =
    canvasContainer.offsetWidth >= 500 ? 500 : canvasContainer.offsetWidth;
console.log(width);
const graphTheory = new GRAPH_THEORY(width, width);
graphTheory.Init();

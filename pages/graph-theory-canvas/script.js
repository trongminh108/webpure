import { BACKGROUND, FOREST, PRIMARY } from '../../constants/palette.js';
import { CIRCLE } from './circle.js';
import { EDGE } from './edge.js';
import {
    MOVE_BUTTON,
    VERTEX_BUTTON,
    EDGE_BUTTON,
    CLEAR_BUTTON,
    UNDIRECTED_GRAPH,
    UNWEIGHTED_GRAPH,
    DIRECTED_GRAPH,
    WEIGHTED_GRAPH,
    IMPORT_BUTTON,
    EXPORT_BUTTON,
    BACKSPACE,
    ENTER,
} from './constants.js';
import {
    ConvertToRadian,
    ExportFile,
    ImportFile,
    SelectOption,
    calculateAngle,
    getDistancePoints,
} from '../../modules/feature_functions.js';
import { CHAPTER1 } from './chapter/chapter1.js';
import { CHAPTER2 } from './chapter/chapter2.js';
import { CHAPTER3 } from './chapter/chapter3.js';
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
        this.edges = [];
        this.RADIUS = 15;
        this.DEFAULT_WEIGHTED = 1;
        this.type_graph = {
            directed: UNDIRECTED_GRAPH,
            weighted: UNWEIGHTED_GRAPH,
        };

        //navbar
        {
            this.navbar = document.querySelector('#navbar');
            this.navbar.style.backgroundColor = FOREST[PRIMARY];
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

            //function buttons
            this.resultContext = document.querySelector('#result-context');
            this.currentChapter = '1';
            new CHAPTER1(this.resultContext, this.graph, this.type_graph);
        }

        //moving vertex and change weighted
        this.isDragging = false;
        this.currentVertex = null;
        this.currentEdge = null;
        this.currentWeighted = null;

        //drawing edge
        this.edge = {};
    }

    ToggleButton(btn) {
        btn.classList.toggle('btn-danger');
        btn.classList.toggle('btn-outline-danger');
    }

    handleBtnClick(btn) {
        const id = btn.id;
        switch (id) {
            case MOVE_BUTTON:
                this.handleClickMoveButton();
                break;
            case VERTEX_BUTTON:
                this.handleClickVertexButton();
                break;
            case EDGE_BUTTON:
                this.handleClickEdgeButton();
                break;
            case CLEAR_BUTTON:
                this.handleClickClearButton();
                break;
            case IMPORT_BUTTON:
                this.handleClickImportButton();
                break;
            case EXPORT_BUTTON:
                this.handleClickExportButton();
                break;
            default:
                break;
        }

        if (id != CLEAR_BUTTON && id != IMPORT_BUTTON && id != EXPORT_BUTTON) {
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
        this.edges.length = 0;
        this.currentEdge = null;
        this.currentWeighted = null;
    }

    async handleClickImportButton() {
        const content = await ImportFile();
        const graph = await content.split('\n');
        graph.pop();
        this.handleClickClearButton();
        const length = parseInt(graph.shift());
        //import vertexes
        for (let i = 0; i < length; i++) {
            const arr = graph
                .shift()
                .split(', ')
                .map((item) => parseInt(item));
            const ver = new CIRCLE(
                this.context,
                arr[0],
                arr[1],
                arr[2],
                arr[3]
            );
            this.vertexes.push(ver);
        }
        //import graph matrix
        graph.forEach((row) => {
            this.graph.push(row.split(', ').map((col) => parseInt(col)));
        });
        this.CreateEdges();

        this.UpdateGraph();
    }

    async handleClickExportButton() {
        // ExportFile('hello', 'graph.txt', 'text/plain');
        let data = `${this.graph.length}\n`;
        this.vertexes.forEach((v) => (data += `${v.toString()}\n`));
        this.graph.forEach((row) => {
            data += row.join(', ');
            data += '\n';
        });
        ExportFile(data, 'graph.txt', 'text/plain');
    }

    handleChangeSelectDirected(e) {
        const type = e.target.value;
        if (this.type_graph.directed != type) {
            this.type_graph.directed = type;
            this.UpdateGraph();
        }
    }

    handleChangeSelectWeighted(e) {
        const type = e.target.value;
        if (this.type_graph.weighted != type) {
            this.type_graph.weighted = type;
            this.UpdateGraph();
        }
    }

    handleChangeSelectChapter(e) {
        const value = e.target.value;
        if (value != this.currentChapter) {
            this.currentChapter = value;
            let chapter;
            if (value === '1')
                chapter = new CHAPTER1(
                    this.resultContext,
                    this.graph,
                    this.type_graph
                );
            else if (value === '2')
                chapter = new CHAPTER2(
                    this.resultContext,
                    this.graph,
                    this.type_graph
                );
            else if (value === '3')
                chapter = new CHAPTER3(
                    this.resultContext,
                    this.graph,
                    this.type_graph,
                    this.vertexes
                );
        }
    }

    CreateVertex(x, y) {
        const pos = { x: x, y: y };
        let isInVertex = false;
        for (const vertex of this.vertexes) {
            if (vertex.isOverlapping(pos, this.RADIUS)) isInVertex = true;
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

            //update graph
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
                this.edge.p2.pos,
                this.type_graph,
                0
            );
            e.draw();
        }

        //draw edges
        if (this.type_graph.directed === DIRECTED_GRAPH)
            this.edges.forEach((item) => item.edge.draw(this.RADIUS));
        else {
            const newEdges = new Set();
            this.edges.forEach((item) => {
                const { vertex } = item;
                const edgeKey1 = `${vertex[0]}-${vertex[1]}`;
                const edgeKey2 = `${vertex[1]}-${vertex[0]}`;

                if (!newEdges.has(edgeKey1) && !newEdges.has(edgeKey2)) {
                    newEdges.add(edgeKey1);
                    newEdges.add(edgeKey2);
                    item.edge.draw();
                }
            });
        }

        if (this.currentEdge != null) {
            const { vertex, edge } = this.edges[this.currentEdge];
            const x = edge.wx - edge.radius;
            const y = edge.wy - edge.radius;
            this.context.strokeStyle = 'black';
            this.context.strokeRect(x, y, edge.radius * 2, edge.radius * 2);
        }

        //draw vertex
        this.vertexes.forEach((ver) => {
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
        //calculate nearest vertex
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

    CreateEdges() {
        this.graph.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col) {
                    const edge = {
                        vertex: [i, j],
                        edge: null,
                    };
                    const p1 = { x: this.vertexes[i].x, y: this.vertexes[i].y };
                    const p2 = { x: this.vertexes[j].x, y: this.vertexes[j].y };
                    edge.edge = new EDGE(
                        this.context,
                        p1,
                        p2,
                        this.type_graph,
                        col
                    );
                    this.edges.push(edge);
                }
            });
        });
    }

    ChangeWeighted(pos) {
        this.edges.forEach((item, index) => {
            const { vertex, edge } = item;
            if (edge.is_click_weighted(pos)) {
                if (this.currentEdge == null) this.currentEdge = index;
                else if (this.currentEdge != index) {
                    const { vertex, edge } = this.edges[this.currentEdge];
                    this.edges[this.currentEdge].edge.weighted =
                        this.graph[vertex[0]][vertex[1]];
                    this.currentEdge = index;
                    this.currentWeighted = null;
                }
                this.UpdateGraph();
                return;
            }
        });
    }

    Init() {
        this.canvas.addEventListener('mousedown', (event) => {
            const pos = { x: event.offsetX, y: event.offsetY };
            switch (this.currentBtn.id) {
                case MOVE_BUTTON:
                    this.MoveVertex(pos);
                    this.ChangeWeighted(pos);
                    break;
                case VERTEX_BUTTON:
                    this.CreateVertex(event.offsetX, event.offsetY);
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
            const id = this.currentBtn.id;
            const isInVer = this.vertexes.some((ver) => ver.isInCircle(pos));
            switch (id) {
                case MOVE_BUTTON:
                    if (isInVer) this.canvas.style.cursor = 'pointer';
                    else this.canvas.style.cursor = '';
                    if (this.isDragging && this.currentVertex != null) {
                        this.vertexes[this.currentVertex].clear();
                        this.vertexes[this.currentVertex].x = pos.x;
                        this.vertexes[this.currentVertex].y = pos.y;
                        this.edges.forEach((item) => {
                            const { vertex, edge } = item;
                            if (vertex[0] === this.currentVertex)
                                edge.update(pos);
                            if (vertex[1] === this.currentVertex)
                                edge.update(null, pos);
                        });
                        this.UpdateGraph();
                    }
                    break;
                case VERTEX_BUTTON:
                    if (isInVer) this.canvas.style.cursor = '';
                    else this.canvas.style.cursor = 'pointer';
                    break;
                case EDGE_BUTTON:
                    if (Object.keys(this.edge).length >= 1) {
                        this.edge.p2 = { pos: pos, index: -1 };
                        this.UpdateGraph();
                    }
                    break;
                default:
                    break;
            }
        });

        this.canvas.addEventListener('mouseup', (event) => {
            const pos = { x: event.offsetX, y: event.offsetY };
            const id = this.currentBtn.id;
            switch (id) {
                case MOVE_BUTTON:
                    if (this.isDragging) {
                        this.isDragging = false;
                        this.currentVertex = null;
                    }
                    break;
                case EDGE_BUTTON:
                    if (Object.keys(this.edge).length == 2) {
                        const min = {
                            value: this.width * this.height,
                            index: -1,
                        };
                        this.vertexes.forEach((ver, index) => {
                            const p2 = { x: ver.x, y: ver.y };
                            const distance = getDistancePoints(pos, p2);
                            if (distance < min.value) {
                                min.value = distance;
                                min.index = index;
                            }
                        });
                        if (this.edge.p1.index != min.index) {
                            this.graph[this.edge.p1.index][min.index] =
                                this.DEFAULT_WEIGHTED;
                            const isExistEdge = this.edges.some(
                                (e) =>
                                    e.vertex[0] === this.edge.p1.index &&
                                    e.vertex[1] === min.index
                            );

                            if (!isExistEdge) {
                                const edge = {
                                    vertex: [this.edge.p1.index, min.index],
                                    edge: null,
                                };
                                const p2 = {
                                    x: this.vertexes[min.index].x,
                                    y: this.vertexes[min.index].y,
                                };
                                edge.edge = new EDGE(
                                    this.context,
                                    this.edge.p1.pos,
                                    p2,
                                    this.type_graph,
                                    this.DEFAULT_WEIGHTED
                                );
                                this.edges.push(edge);
                            }
                        }

                        this.edge = {};
                        this.UpdateGraph();
                    }
                    break;

                default:
                    break;
            }
        });

        this.canvas.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            console.log('[EVENT]: ', x, y);
        });

        document.addEventListener('keydown', (e) => {
            const idBtn = this.currentBtn.id;
            const key = e.key;
            if (this.currentEdge != null) {
                switch (idBtn) {
                    case MOVE_BUTTON:
                        switch (key) {
                            case BACKSPACE:
                                this.currentWeighted = parseInt(
                                    this.currentWeighted.toString().slice(0, -1)
                                );
                                this.edges[this.currentEdge].edge.weighted =
                                    this.currentWeighted;
                                if (isNaN(this.currentWeighted)) {
                                    this.edges[
                                        this.currentEdge
                                    ].edge.weighted = 0;
                                    this.currentWeighted = null;
                                }
                                break;
                            case ENTER:
                                const { vertex } = this.edges[this.currentEdge];
                                if (isNaN(this.currentWeighted))
                                    this.currentWeighted = 0;
                                this.graph[vertex[0]][vertex[1]] = parseInt(
                                    this.currentWeighted
                                );
                                this.currentEdge = null;
                                this.currentWeighted = null;
                                break;

                            default:
                                break;
                        }
                        if (!isNaN(key) && this.currentEdge != null) {
                            if (this.currentWeighted == null)
                                this.currentWeighted = key;
                            else this.currentWeighted += key;
                            this.edges[this.currentEdge].edge.weighted =
                                parseInt(this.currentWeighted);
                        }
                        this.UpdateGraph();
                        break;

                    default:
                        break;
                }
            }
        });

        // Options
        {
            const selectDirected = this.navbar.querySelector('#selectDirected');
            selectDirected.addEventListener('change', (e) =>
                this.handleChangeSelectDirected(e)
            );

            const selectWeighted = this.navbar.querySelector('#selectWeighted');
            selectWeighted.addEventListener('change', (e) => {
                this.handleChangeSelectWeighted(e);
            });

            const selectChapter = this.navbar.querySelector('#selectChapter');
            selectChapter.addEventListener('change', (e) =>
                this.handleChangeSelectChapter(e)
            );
        }
    }
}

const canvasContainer = document.querySelector('#canvas-container');
const offsetW = canvasContainer.offsetWidth - 35;
const width = offsetW >= 500 ? 500 : offsetW;
const graphTheory = new GRAPH_THEORY(width, width);
graphTheory.Init();

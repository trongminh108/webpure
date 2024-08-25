import {
    CreateElement,
    ShowToastify,
} from '../../../modules/feature_functions.js';
import {
    ENTER,
    MESS_DRAW_GRAPH_FIRST,
    MESS_GRAPH_WEIGHTED,
    TEXT_ALG_TABLE,
    TEXT_DIRECTION,
    TEXT_MIN_DISTANCE,
    UNDIRECTED_GRAPH,
    WEIGHTED_GRAPH,
} from '../constants.js';
import { DIJKSTRA, FLOYD, FORD_BELLMAN } from './buttons.js';
import ALG_DIJKSTRA from '../algorithms/dijkstra.js';
import ALG_FORD_BELLMAN from '../algorithms/ford_bellman.js';
import ALG_FLOYD from '../algorithms/floyd.js';

import { CHAPTER } from './chapter.js';
import { EDGE } from '../edge.js';
import { CIRCLE } from '../circle.js';

const LIST_BUTTONS = [
    {
        name: 'Dijkstra',
        value: DIJKSTRA,
    },
    {
        name: 'Ford Bellman',
        value: FORD_BELLMAN,
    },
    {
        name: 'Floyd',
        value: FLOYD,
    },
];

const INFINITE = '∞';

export class CHAPTER5 extends CHAPTER {
    constructor(context, graph, type, vertexes) {
        super(context, graph, type, LIST_BUTTONS);
        this.vertexes = vertexes;
    }

    CreateInputVertexes(type) {
        const inputContainer = CreateElement('form', 'd-flex gap-3');
        const group1 = CreateElement(
            'group1',
            'input-group my-3',
            null,
            inputContainer
        );
        CreateElement('span', 'input-group-text', 'Đỉnh bắt đầu: ', group1);
        const inputStart = CreateElement('input', 'form-control', null, group1);
        inputStart.placeholder = 'ex: 1, 2, 3...';
        inputStart.type = 'number';
        inputStart.id = 'start';

        inputStart.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key === ENTER) {
                e.preventDefault();
                inputContainer.dispatchEvent(new Event('submit'));
            }
        });

        const group2 = CreateElement(
            'group2',
            'input-group my-3',
            null,
            inputContainer
        );
        CreateElement('span', 'input-group-text', 'Đỉnh kết thúc: ', group2);
        const inputEnd = CreateElement('input', 'form-control', null, group2);
        inputEnd.placeholder = 'ex: 1, 2, 3...';
        inputEnd.type = 'number';
        inputEnd.id = 'start';

        inputEnd.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key === ENTER) {
                e.preventDefault();
                inputContainer.dispatchEvent(new Event('submit'));
            }
        });

        inputContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const start = parseInt(inputStart.value);
                const end = parseInt(inputEnd.value);
                const n = this.graph.length;

                if (isNaN(start) || isNaN(end))
                    throw Error('Đỉnh đầu và cuối phải khác rỗng!');
                if (start === end) throw Error('Đỉnh đầu phải khác điểm cuối!');
                if (start <= 0 || end <= 0)
                    throw new Error('Đỉnh bắt đầu và kết thúc phải > 0');
                if (start <= n && end <= n) {
                    this.UpdateResult(inputContainer);

                    if (type === DIJKSTRA) this.SolveDijkstra(start, end);
                    else if (type === FORD_BELLMAN)
                        this.SolveFordBellman(start, end);
                    else if (type === FLOYD) this.SolveFloyd(start, end);
                } else
                    throw new Error(
                        `Đỉnh bắt đầu và kết thúc phải <= ${this.graph.length}`
                    );
            } catch (error) {
                ShowToastify(error.message);
            }
        });
        this.UpdateResult(inputContainer);
    }

    CreateTable() {
        const table = CreateElement('table');
        table.border = 2;
        table.style.borderCollapse = 'collapse';
        return table;
    }

    /**
     * AddTableRow
     *
     * @param {Array} data mảng dữ liệu.
     * @param {Node} table node table.
     * @returns {Node} node table row
     * @example
     * `Iam lazy to write :>`
     */
    AddTableRow(data, table) {
        const tr = CreateElement('tr', null, null, table);
        data.forEach((d) => {
            const td = CreateElement('td', null, d.toString(), tr);
        });
        return tr;
    }

    CreateCanvasResult() {
        const canvasResult = CreateElement('canvas', 'mt-3');
        const offsetW = this.result.offsetWidth - 35;
        const width = offsetW >= 500 ? 500 : offsetW;
        canvasResult.width = width;
        canvasResult.height = width;
        const contextResult = canvasResult.getContext('2d');
        return { canvas: canvasResult, context: contextResult };
    }

    /**
     *
     * @param {context} context context 2d canvas
     * @param {{
     *      edge: Array
     *      weighted: number
     * }} edges
     * @param {Array<CIRCLE>} vertexes
     */
    DrawGraph(context, edges, vertexes) {
        //draw edge
        const newVertexes = [];
        vertexes.forEach((v) => newVertexes.push(CIRCLE.deepCopy(v)));
        edges.forEach((item) => {
            const { edge, weighted } = item;
            if (weighted != 0) {
                const p1 = {
                    x: newVertexes[edge[0]].x,
                    y: newVertexes[edge[0]].y,
                };
                const p2 = {
                    x: newVertexes[edge[1]].x,
                    y: newVertexes[edge[1]].y,
                };
                new EDGE(context, p1, p2, this.type, weighted).draw(
                    EDGE.RADIUS
                );
            }
        });
        newVertexes.forEach((v) => {
            v.context = context;
            v.draw();
        });
    }

    /**
     *
     * @param {Array} res data array result
     * @param {Node} table table result node
     */
    FormatResultDijkstra(res, table) {
        res.forEach((row, i) => {
            const data = [];
            const { distance, isVisited, previous } = row;
            if (i == 0) data.push('KT');
            else data.push(i);
            distance.forEach((item, j) => {
                if (isVisited[j]) data.push('-');
                else {
                    let dis = item >= ALG_DIJKSTRA.MAX_VALUE ? INFINITE : item;
                    let asterisk = '';
                    if (i < res.length - 1) {
                        const currVisited = [...isVisited];
                        const nextVisited = res[i + 1].isVisited;
                        for (let i = 0; i < currVisited.length; i++) {
                            if (currVisited[i] != nextVisited[i]) {
                                if (i == j) asterisk = '*';
                                break;
                            }
                        }
                    } else asterisk = '*';
                    data.push(`${dis}, ${previous[j] + 1}${asterisk}`);
                }
            });
            this.AddTableRow(data, table);
        });
        const finalRow = ['KQ'];
        const { distance, previous } = res[res.length - 1];
        distance.forEach((item, i) => {
            let dis = item >= ALG_DIJKSTRA.MAX_VALUE ? INFINITE : item;
            finalRow.push(`${dis}, ${previous[i] + 1}*`);
        });
        this.AddTableRow(finalRow, table);
    }

    SolveDijkstra(start, end) {
        const table = this.CreateTable();
        const list = this.graph.map((row, index) => index + 1);
        const header = ['', ...list];
        this.AddTableRow(header, table);
        let newGraph = this.graph;
        if (this.type.directed === UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();
        const dijkstra = new ALG_DIJKSTRA(newGraph, start);

        const res = dijkstra.GetResult();

        //Algorithm table
        CreateElement('p', 'fw-bold', TEXT_ALG_TABLE, this.result);
        this.FormatResultDijkstra(res, table);
        this.result.appendChild(table);

        const { context, canvas } = this.CreateCanvasResult();
        const edges = [];
        const { distance, previous } = res[res.length - 1];
        previous.forEach((ver, index) => {
            if (ver != index) {
                edges.push({
                    edge: [ver, index],
                    weighted: newGraph[ver][index],
                });
            }
        });

        this.result.appendChild(
            CreateElement(
                'p',
                'mt-3',
                TEXT_MIN_DISTANCE(
                    start,
                    end,
                    distance[end - 1] >= ALG_DIJKSTRA.MAX_VALUE
                        ? INFINITE
                        : distance[end - 1]
                )
            )
        );

        //Graph
        CreateElement('p', 'fw-bold mt-3', TEXT_DIRECTION, this.result);
        this.DrawGraph(context, edges, this.vertexes);
        this.result.appendChild(canvas);
    }

    FormatResultFordBellman(res, table) {
        res.forEach((row, i) => {
            const data = [];
            const { distance, previous } = row;
            if (i == 0) data.push('KT');
            else data.push(i);
            distance.forEach((item, j) => {
                let dis = item >= ALG_DIJKSTRA.MAX_VALUE ? INFINITE : item;
                data.push(`${dis}, ${previous[j] + 1}`);
            });
            this.AddTableRow(data, table);
        });
    }

    SolveFordBellman(start, end) {
        let newGraph = this.graph;
        if (this.type.directed === UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();
        const fordBellman = new ALG_FORD_BELLMAN(newGraph, start);
        const res = fordBellman.GetResult();

        //algorithm table
        CreateElement('p', 'fw-bold', TEXT_ALG_TABLE, this.result);
        const table = this.CreateTable();
        const list = this.graph.map((row, index) => index + 1);
        const header = ['', ...list];
        this.AddTableRow(header, table);
        this.FormatResultFordBellman(res, table);
        this.result.appendChild(table);

        const { context, canvas } = this.CreateCanvasResult();
        const edges = [];
        const { distance, previous } = res[res.length - 1];
        previous.forEach((ver, index) => {
            if (ver != index) {
                edges.push({
                    edge: [ver, index],
                    weighted: newGraph[ver][index],
                });
            }
        });

        this.result.appendChild(
            CreateElement(
                'p',
                'mt-3',
                TEXT_MIN_DISTANCE(
                    start,
                    end,
                    distance[end - 1] >= ALG_FORD_BELLMAN.MAX_VALUE
                        ? INFINITE
                        : distance[end - 1]
                )
            )
        );

        //direction
        CreateElement('p', 'fw-bold mt-3', TEXT_DIRECTION, this.result);

        this.DrawGraph(context, edges, this.vertexes);
        this.result.appendChild(canvas);
    }

    FloydMatrix(row, name, matrix) {
        const col = CreateElement(
            'div',
            'col d-flex align-items-center',
            null,
            row
        );
        col.appendChild(CreateElement('p', 'fw-bold m-2', name));
        const table = this.CreateTable();
        col.appendChild(table);
        matrix.forEach((row) => {
            const newRow = [...row].map((col) =>
                col >= ALG_FLOYD.MAX_VALUE ? INFINITE : col
            );
            this.AddTableRow(newRow, table);
        });
        return col;
    }

    SolveFloyd(start, end) {
        let newGraph = this.graph;
        if (this.type.directed === UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();
        const nameAlg = CreateElement('p', 'fw-bold', '. Giải thuật Floyd:');
        this.UpdateResult(nameAlg);
        this.result.appendChild(
            CreateElement('p', 'fw-bold', '+ Ma trận A, P ban đầu:')
        );
        const res = new ALG_FLOYD(newGraph);

        const container = CreateElement('div', 'container', null, this.result);
        const row = CreateElement('div', 'row', null, container);

        row.appendChild(this.FloydMatrix(row, 'A0 = ', res.distance));
        row.appendChild(
            this.FloydMatrix(
                row,
                'P0 = ',
                [...res.previous].map((row) => row.map((col) => col + 1))
            )
        );

        res.Solve();
        CreateElement('div', 'row fw-bold mt-3', '+ Các bước lặp:', container);
        res.data.forEach((data, index) => {
            const { distance, previous } = data;
            const row = CreateElement('div', 'row mt-3', null, container);
            row.appendChild(
                this.FloydMatrix(row, `A${index + 1} = `, distance)
            );
            row.appendChild(
                this.FloydMatrix(row, `P${index + 1} = `, previous)
            );
        });

        const distance = res.data[res.data.length - 1].distance;
        this.result.appendChild(
            CreateElement(
                'p',
                'mt-3',
                TEXT_MIN_DISTANCE(
                    start,
                    end,
                    distance[start - 1][end - 1] >= ALG_FLOYD.MAX_VALUE
                        ? INFINITE
                        : distance[start - 1][end - 1]
                )
            )
        );
    }

    handleClickButtons(event) {
        const id = event.target.id;
        if (this.graph.length > 0)
            if (this.type.weighted === WEIGHTED_GRAPH)
                switch (id) {
                    case DIJKSTRA:
                        this.handleClickDijkstra();
                        break;
                    case FORD_BELLMAN:
                        this.handleClickFordBellman();
                        break;
                    case FLOYD:
                        this.handleClickFloyd();
                        break;
                    default:
                        break;
                }
            else ShowToastify(MESS_GRAPH_WEIGHTED);
        else ShowToastify(MESS_DRAW_GRAPH_FIRST);
    }

    handleClickDijkstra() {
        this.CreateInputVertexes(DIJKSTRA);
    }

    handleClickFordBellman() {
        this.CreateInputVertexes(FORD_BELLMAN);
    }

    handleClickFloyd() {
        this.CreateInputVertexes(FLOYD);
    }
}

{
    /* <div class="ver1 d-flex justify-content-center align-items-center">
    <div class="vertex">1</div>
    <div class="arrow"></div>
    <div class="vertex">1</div>
    <div class="arrow"></div>
    <div class="fw-bold mx-2">Null</div>
</div> */
}

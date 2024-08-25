import {
    CreateElement,
    ShowToastify,
} from '../../../modules/feature_functions.js';
import { CIRCLE } from '../circle.js';
import {
    CONCLUDE_TOTAL_WEIGHTED,
    ENTER,
    MESS_DRAW_GRAPH_FIRST,
    UNDIRECTED_GRAPH,
} from '../constants.js';
import { EDGE } from '../edge.js';
import { willCreateCycle } from '../modules/union_find.js';
import {
    BREADTH_FIRST_SEARCH,
    DEPTH_FIRST_SEARCH,
    DIJKSTRA,
    FLOYD,
    FORD_BELLMAN,
    MIN_SPANNING_TREE_KRUSKAL,
    MIN_SPANNING_TREE_PRIM,
    SPANNING_TREE_BFS,
    SPANNING_TREE_DFS,
} from './buttons.js';
import { CHAPTER } from './chapter.js';

const LIST_BUTTONS = [
    {
        name: 'Cây khung DFS',
        value: SPANNING_TREE_DFS,
    },
    {
        name: 'Cây khung BFS',
        value: SPANNING_TREE_BFS,
    },
    {
        name: 'Cây khung NN Kruskal',
        value: MIN_SPANNING_TREE_KRUSKAL,
    },
    {
        name: 'Cây khung NN Prim',
        value: MIN_SPANNING_TREE_PRIM,
    },
];

export class CHAPTER3 extends CHAPTER {
    /**
     *
     * @param {context} context context 2d canvas
     * @param {number[]} graph graph matrix
     * @param {string[]} type type of graph
     * @param {CIRCLE[]} vertexes list of vertexes
     *
     */
    constructor(context, graph, type, vertexes) {
        super(context, graph, type, LIST_BUTTONS);
        this.vertexes = vertexes;
    }

    handleClickButtons(event) {
        const id = event.target.id;
        if (this.graph.length > 0) {
            switch (id) {
                case SPANNING_TREE_DFS:
                    this.handleClickSpanningTreeDFS();
                    break;

                case SPANNING_TREE_BFS:
                    this.handleClickSpanningTreeBFS();
                    break;

                case MIN_SPANNING_TREE_KRUSKAL:
                    this.handleClickMinSpanningTreeKruskal();
                    break;

                case MIN_SPANNING_TREE_PRIM:
                    this.handleClickMinSpanningTreePrim();
                    break;

                default:
                    break;
            }
        } else ShowToastify(MESS_DRAW_GRAPH_FIRST);
    }

    SolveDFS(start) {
        this.newGraph = this.graph;
        if (this.type.directed == UNDIRECTED_GRAPH)
            this.newGraph = this.CreateMatrixUnDirectedGraph();

        const DFS = (v) => {
            res.push(v);
            const adjacency = this.newGraph[v];
            isVisited[v] = true;
            adjacency.forEach((vertex, index) => {
                if (vertex && !isVisited[index]) {
                    DFS(index);
                    edges.push([v, index]);
                }
            });
        };

        const res = [];
        const edges = [];
        const isVisited = Array.from(
            { length: this.graph.length },
            () => false
        );
        DFS(start);
        const div = CreateElement('div', null);
        CreateElement('b', null, `DFS(${start + 1}): `, div);
        CreateElement('span', null, res.map((v) => v + 1).join(' → '), div);
        return { edges: edges, node: div };
    }

    SolveBFS(start) {
        let newGraph = this.graph;
        if (this.type.directed == UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();

        const BFS = (v) => {
            const queue = [];
            let x;
            isVisited[v] = true;
            queue.push(v);
            res.push(v);
            while (queue.length != 0) {
                x = queue.shift();
                const adjacency = newGraph[x];
                adjacency.forEach((w, index) => {
                    if (w && !isVisited[index]) {
                        isVisited[index] = true;
                        queue.push(index);
                        res.push(index);
                        edges.push([x, index]);
                    }
                });
            }
        };

        const res = [];
        const edges = [];
        const isVisited = Array.from(
            { length: this.graph.length },
            () => false
        );

        BFS(start);
        const div = CreateElement('div');
        CreateElement('b', null, `BFS(${start + 1}): `, div);
        CreateElement('span', null, res.map((v) => v + 1).join(' → '), div);
        return { edges: edges, node: div };
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

    CreateInputVertex(type) {
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

        inputContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const start = parseInt(inputStart.value);
                const n = this.graph.length;

                if (isNaN(start)) throw Error('Đỉnh đầu không thể trống!');
                if (start <= 0) throw new Error('Đỉnh bắt đầu phải > 0');
                if (start <= n) {
                    this.UpdateResult(inputContainer);
                    switch (type) {
                        case DEPTH_FIRST_SEARCH:
                            this.ShowResult(this.SolveDFS(start - 1));
                            break;
                        case BREADTH_FIRST_SEARCH:
                            this.ShowResult(this.SolveBFS(start - 1));
                            break;
                    }
                } else
                    throw new Error(
                        `Đỉnh bắt đầu phải <= ${this.graph.length}`
                    );
            } catch (error) {
                ShowToastify(error.message);
            }
        });
        this.UpdateResult(inputContainer);
    }

    ShowResult(result) {
        const { edges, node } = result;
        const newVertexes = [];
        this.vertexes.forEach((v) => newVertexes.push(CIRCLE.deepCopy(v)));

        const { canvas, context } = this.CreateCanvasResult();

        edges.forEach((edge) => {
            const p1 = {
                x: newVertexes[edge[0]].x,
                y: newVertexes[edge[0]].y,
            };
            const p2 = {
                x: newVertexes[edge[1]].x,
                y: newVertexes[edge[1]].y,
            };
            new EDGE(
                context,
                p1,
                p2,
                this.type,
                this.newGraph[edge[0]][edge[1]]
            ).draw(EDGE.RADIUS);
        });

        this.result.appendChild(node);
        newVertexes.forEach((v) => {
            v.context = context;
            v.draw();
        });
        this.result.appendChild(canvas);
    }

    SortWeighted(a, b) {
        const w1 = a.weighted;
        const w2 = b.weighted;
        if (w1 >= w2) return 1;
        else return -1;
    }

    DrawGraph(context, edges, vertexes) {
        //draw edge
        const newVertexes = [];
        vertexes.forEach((v) => newVertexes.push(CIRCLE.deepCopy(v)));
        edges.forEach((item) => {
            const { edge, weighted } = item;
            const p1 = {
                x: newVertexes[edge[0]].x,
                y: newVertexes[edge[0]].y,
            };
            const p2 = {
                x: newVertexes[edge[1]].x,
                y: newVertexes[edge[1]].y,
            };
            new EDGE(context, p1, p2, this.type, weighted).draw(EDGE.RADIUS);
        });
        newVertexes.forEach((v) => {
            v.context = context;
            v.draw();
        });
    }

    GetMinIndex(vertexes, isVisited) {
        let min = {
            weighted: 1000,
            index: -1,
            edge: null,
        };
        vertexes.forEach((v) => {
            const adjacency = this.newGraph[v];
            adjacency.forEach((w, j) => {
                if (
                    !isVisited[j] &&
                    min.weighted > adjacency[j] &&
                    adjacency[j] != 0
                ) {
                    min.weighted = w;
                    min.index = j;
                    min.edge = [v, j];
                }
            });
        });
        return min;
    }

    handleClickSpanningTreeDFS() {
        this.CreateInputVertex(DEPTH_FIRST_SEARCH);
    }

    handleClickSpanningTreeBFS() {
        this.CreateInputVertex(BREADTH_FIRST_SEARCH);
    }

    handleClickMinSpanningTreeKruskal() {
        let edgesList = [];
        this.newGraph = this.graph;

        this.newGraph.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col) {
                    const item = {
                        edge: [i, j],
                        weighted: col,
                    };
                    edgesList.push(item);
                }
            });
        });
        edgesList = edgesList.sort(this.SortWeighted);
        edgesList = edgesList.map((item) => {
            const { edge } = item;
            item.edge = [
                edge[0] < edge[1] ? edge[0] : edge[1],
                edge[0] > edge[1] ? edge[0] : edge[1],
            ];
            return item;
        });
        // console.log(edgesList);

        const res = [];
        edgesList.forEach((item) => {
            const { edge } = item;
            const isCycle = willCreateCycle(res, edge, this.graph.length);
            if (!isCycle) res.push(item);
        });

        const { context, canvas } = this.CreateCanvasResult();
        this.DrawGraph(context, res, this.vertexes);

        //Show result
        const node = CreateElement(
            'p',
            'fw-bold',
            'Cây khung nhỏ nhất bằng GT Kruskal:'
        );
        this.UpdateResult(node);
        const edges = res.map(({ edge }) => `(${edge[0] + 1}, ${edge[1] + 1})`);
        CreateElement(
            'p',
            null,
            `. Chọn cạnh: ${edges.join(', ')}`,
            this.result
        );
        const weights = res.map((item) => item.weighted);
        CreateElement(
            'p',
            null,
            `${CONCLUDE_TOTAL_WEIGHTED} ${weights.join(
                ' + '
            )} = ${weights.reduce((acc, weighted) => acc + weighted, 0)}`,
            this.result
        );
        this.result.appendChild(canvas);
    }

    handleClickMinSpanningTreePrim() {
        this.newGraph = this.graph;
        if (this.type.directed == UNDIRECTED_GRAPH)
            this.newGraph = this.CreateMatrixUnDirectedGraph();

        const n = this.newGraph.length;
        const isVisited = new Array(n).fill(false);
        isVisited[0] = true;
        const res = [0];
        const edges = [];

        while (res.length < n) {
            const min = this.GetMinIndex(res, isVisited);
            isVisited[min.index] = true;
            res.push(min.index);
            edges.push(min);
        }

        const { context, canvas } = this.CreateCanvasResult();

        this.DrawGraph(context, edges, this.vertexes);

        //Show result
        const node = CreateElement(
            'p',
            'fw-bold',
            'Cây khung nhỏ nhất bằng GT Prim:'
        );
        this.UpdateResult(node);
        CreateElement(
            'p',
            null,
            `. Chọn đỉnh: ${res.map((v) => v + 1).join(', ')}`,
            this.result
        );
        const weights = edges.map((item) => item.weighted);
        CreateElement(
            'p',
            null,
            `${CONCLUDE_TOTAL_WEIGHTED} ${weights.join(
                ' + '
            )} = ${weights.reduce((acc, weighted) => acc + weighted, 0)}`,
            this.result
        );
        this.result.appendChild(canvas);
    }
}

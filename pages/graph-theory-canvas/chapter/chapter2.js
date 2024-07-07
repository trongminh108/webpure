import {
    CreateElement,
    ShowToastify,
} from '../../../modules/feature_functions.js';
import { ENTER, UNDIRECTED_GRAPH } from '../constants.js';
import { BREADTH_FIRST_SEARCH, DEPTH_FIRST_SEARCH } from './buttons.js';
import { CHAPTER } from './chapter.js';

const LIST_BUTTONS = [
    {
        name: 'Duyệt chiều sâu',
        value: DEPTH_FIRST_SEARCH,
    },
    {
        name: 'Duyệt chiều rộng',
        value: BREADTH_FIRST_SEARCH,
    },
];

export class CHAPTER2 extends CHAPTER {
    constructor(context, graph, type) {
        super(context, graph, type, LIST_BUTTONS);
    }

    SolveDFS(start) {
        let newGraph = this.graph;
        if (this.type.directed == UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();

        const DFS = (v) => {
            res.push(v);
            const adjacency = newGraph[v];
            isVisited[v] = true;
            adjacency.forEach((vertex, index) => {
                if (vertex && !isVisited[index]) {
                    DFS(index);
                }
            });
        };

        const res = [];
        const isVisited = Array.from(
            { length: this.graph.length },
            () => false
        );
        DFS(start);
        const div = CreateElement('div', null);
        CreateElement('b', null, `DFS(${start + 1}): `, div);
        CreateElement('span', null, res.map((v) => v + 1).join(' → '), div);
        this.result.appendChild(div);
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
                    }
                });
            }
        };

        const res = [];
        const isVisited = Array.from(
            { length: this.graph.length },
            () => false
        );

        BFS(start);
        const div = CreateElement('div');
        CreateElement('b', null, `BFS(${start + 1}): `, div);
        CreateElement('span', null, res.map((v) => v + 1).join(' → '), div);
        this.result.appendChild(div);
    }

    CreateInputStartVertex(type) {
        const div = CreateElement('div', 'input-group my-3');
        CreateElement('span', 'input-group-text', 'Đỉnh bắt đầu: ', div);
        const input = CreateElement('input', 'form-control', null, div);
        input.placeholder = 'ex: 1, 2, 3...';
        input.type = 'number';
        input.addEventListener('keydown', (e) => {
            const key = e.key;
            const value = e.target.value;
            if (key === ENTER) {
                if (!isNaN(value) && parseInt(value) <= this.graph.length) {
                    if (type === DEPTH_FIRST_SEARCH)
                        this.SolveDFS(parseInt(value) - 1);
                    else if (type === BREADTH_FIRST_SEARCH)
                        this.SolveBFS(parseInt(value) - 1);
                } else
                    ShowToastify(
                        'Vui lòng nhập đỉnh <= ' + this.graph.length.toString()
                    );
            }
        });
        this.UpdateResult(div);
    }

    handleClickButtons(event) {
        const id = event.target.id;
        if (this.graph.length > 0)
            switch (id) {
                case DEPTH_FIRST_SEARCH:
                    this.CreateInputStartVertex(DEPTH_FIRST_SEARCH);
                    break;

                case BREADTH_FIRST_SEARCH:
                    this.CreateInputStartVertex(BREADTH_FIRST_SEARCH);
                    break;

                default:
                    break;
            }
        else ShowToastify('Vui lòng vẽ đồ thị trước!');
    }
}

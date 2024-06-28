import {
    CreateElement,
    ShowToastify,
} from '../../../modules/feature_functions.js';
import { UNDIRECTED_GRAPH } from '../constants.js';
import { ADJACENCY_LIST, ADJACENCY_MATRIX, EDGES_LIST } from './buttons.js';
import { CHAPTER } from './chapter.js';

const LIST_BUTTONS = [
    {
        name: 'Ma trận kề',
        value: ADJACENCY_MATRIX,
    },
    {
        name: 'Danh sách cạnh - cung',
        value: EDGES_LIST,
    },
    {
        name: 'Danh sách kề',
        value: ADJACENCY_LIST,
    },
];

{
    /* <button class="col btn btn-secondary">
    Ma trận kề
</button>
<button class="col btn btn-secondary">
    Danh sách cạnh - cung
</button>
<button class="col btn btn-secondary">
    Danh sách kề
</button> */
}

export class CHAPTER1 extends CHAPTER {
    constructor(context, graph, type) {
        super(context, graph, type, LIST_BUTTONS);
    }

    handleClickButtons(event) {
        const id = event.target.id;
        switch (id) {
            case ADJACENCY_MATRIX:
                this.handleClickAdjacencyMatrix();
                break;
            case EDGES_LIST:
                this.handleClickEdgesList();
                break;
            case ADJACENCY_LIST:
                this.handleClickAdjacencyList();
                break;
            default:
                break;
        }
    }

    CreateMatrixUnDirectedGraph() {
        const n = this.graph.length;
        const res = Array.from({ length: n }, () => new Array(n).fill(0));
        this.graph.forEach((row, i) => {
            row.forEach((col, j) => {
                if (col) {
                    res[i][j] = col;
                    res[j][i] = col;
                }
            });
        });
        return res;
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

    handleClickAdjacencyMatrix() {
        const table = this.CreateTable();
        let newGraph = this.graph;
        if (this.type.directed === UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();
        newGraph.forEach((row) => {
            const tr = CreateElement('tr');
            table.appendChild(tr);
            row.forEach((col) => CreateElement('td', null, col.toString(), tr));
        });
        this.UpdateResult(table);
    }

    handleClickEdgesList() {
        const table = this.CreateTable();
        const tr = CreateElement('tr', null, null, table);
        CreateElement('th', null, 'Đầu', tr);
        CreateElement('th', null, 'Cuối', tr);
        let newGraph = this.graph;
        const n = this.graph.length;
        if (this.type.directed === UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();
        newGraph.forEach((row, i) => {
            if (this.type.directed === UNDIRECTED_GRAPH) {
                for (let j = i; j < n; j++)
                    if (newGraph[i][j]) {
                        const data = [i + 1, j + 1];
                        this.AddTableRow(data, table);
                    }
            } else
                row.forEach((col, j) => {
                    if (col) {
                        const data = [i + 1, j + 1];
                        this.AddTableRow(data, table);
                    }
                });
        });
        this.UpdateResult(table);
    }

    handleClickAdjacencyList() {
        //using array
        const adjacency = [];
        const vertexes = [];
        let newGraph = this.graph;
        if (this.type.directed === UNDIRECTED_GRAPH)
            newGraph = this.CreateMatrixUnDirectedGraph();
        newGraph.forEach((row, i) => {
            vertexes.push(adjacency.length);
            row.forEach((col, j) => {
                if (col) adjacency.push(j);
            });
        });
        vertexes.push(adjacency.length);

        const res = CreateElement('div');

        CreateElement(
            'p',
            'fw-bold',
            '1. Lưu trữ bằng mảng (bắt đầu từ đỉnh 1):',
            res
        );
        CreateElement(
            'p',
            null,
            `ke = [${adjacency.map((a) => a + 1).join(', ')}]`,
            res
        );
        CreateElement(
            'p',
            null,
            `tro = [${vertexes.map((a) => a + 1).join(', ')}]`,
            res
        );

        //using linked list
        CreateElement(
            'p',
            'fw-bold',
            '2. Lưu trữ bằng danh sách liên kết:',
            res
        );
        const linkedList = [];
        newGraph.forEach((row, i) => {
            linkedList.push([i]);
            row.forEach((col, j) => {
                if (col) linkedList[i].push(j);
            });
        });

        const resLink = CreateElement(
            'div',
            'd-flex flex-column align-items-start gap-2',
            null,
            res
        );

        linkedList.forEach((vertexes, i) => {
            const div = CreateElement(
                'div',
                'd-flex justify-content-center align-items-center',
                null,
                resLink
            );
            vertexes.forEach((ver) => {
                CreateElement('div', 'vertex', ver + 1, div);
                CreateElement('div', 'arrow', null, div);
            });
            CreateElement('div', 'fw-bold mx-2', 'Null', div);
        });

        this.UpdateResult(res);
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

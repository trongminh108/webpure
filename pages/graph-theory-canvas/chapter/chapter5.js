import {
    CreateElement,
    ShowToastify,
} from '../../../modules/feature_functions.js';
import { DIJKSTRA, FLOYD, FORD_BELLMAN } from './buttons.js';

import { CHAPTER } from './chapter.js';

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

export class CHAPTER5 extends CHAPTER {
    constructor(context, graph, type) {
        super(context, graph, type, LIST_BUTTONS);
    }

    handleClickButtons(event) {
        const id = event.target.id;
        if (this.graph.length > 0)
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
        else ShowToastify('Vui lòng vẽ đồ thị trước!');
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

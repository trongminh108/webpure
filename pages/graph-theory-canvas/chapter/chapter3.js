import {
    CreateElement,
    ShowToastify,
} from '../../../modules/feature_functions.js';
import { MESS_DRAW_GRAPH_FIRST } from '../constants.js';
import {
    BREADTH_FIRST_SEARCH,
    DEPTH_FIRST_SEARCH,
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
    constructor(context, graph, type) {
        super(context, graph, type, LIST_BUTTONS);
    }

    handleClickButtons(event) {
        const id = event.target.id;
        if (this.graph.length > 0) {
            switch (id) {
                case SPANNING_TREE_DFS:
                    break;
                case SPANNING_TREE_BFS:
                    break;
                case MIN_SPANNING_TREE_KRUSKAL:
                    break;

                case MIN_SPANNING_TREE_PRIM:
                    break;

                default:
                    break;
            }
        } else ShowToastify(MESS_DRAW_GRAPH_FIRST);
    }
}

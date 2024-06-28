import { CreateElement } from '../../../modules/feature_functions.js';
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
}

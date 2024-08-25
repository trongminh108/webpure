import { CHAPTER } from './chapter.js';

const LIST_BUTTONS = [
    {
        name: 'Không có học',
        value: '',
    },
    {
        name: 'nếu bạn có học vui lòng bổ sung thêm',
        value: '',
    },
    {
        name: ':>',
        value: '',
    },
];

export class CHAPTER4 extends CHAPTER {
    constructor(context, graph, type) {
        super(context, graph, type, LIST_BUTTONS);
    }
}

import { CreateElement } from '../../../modules/feature_functions.js';

export class CHAPTER {
    constructor(context, graph, type, listButtons) {
        this.graph = graph;
        this.context = context;
        this.type = type;
        this.listButtons = listButtons;
        this.result = context.querySelector('#result');
        this.GenerateButtons();
    }

    GenerateButtons() {
        const listButtons = this.context.querySelector('#list-buttons');
        listButtons.replaceChildren();
        this.listButtons.forEach((btn) => {
            const node = CreateElement(
                'button',
                'col btn btn-secondary',
                btn.name
            );
            node.id = btn.value;
            if (this.listButtons.length >= 4) node.classList.add('col-5');
            node.addEventListener('click', (e) => this.handleClickButtons(e));
            listButtons.appendChild(node);
        });
    }

    UpdateResult(node) {
        this.result.replaceChildren();
        this.result.appendChild(node);
    }

    handleClickButtons(event) {
        const id = event.target.id;
        alert(id);
    }
}

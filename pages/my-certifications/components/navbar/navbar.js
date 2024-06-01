import {
    CreateElement,
    SelectOption,
} from '../../../../modules/feature_functions.js';
import { languages, websites } from '../../data.js';

export function Init() {
    const form = document.querySelector('.form');
    const optionsWebsite = Object.values(websites).map((web) => ({
        id: web,
        value: web,
    }));
    optionsWebsite.unshift({ id: 'all', value: 'All' });

    const optionsLanguage = Object.values(languages).map((lang) => ({
        id: lang,
        value: lang,
    }));
    optionsLanguage.unshift({ id: 'all', value: 'All' });

    form.appendChild(SelectOption(optionsWebsite, 'Website'));
    form.appendChild(SelectOption(optionsLanguage, 'Language'));
    const inputGroup = CreateElement('div', 'input-group', null, form);
    const searchInput = CreateElement(
        'input',
        'form-control me-2',
        null,
        inputGroup
    );
    searchInput.type = 'search';
    searchInput.placeholder = 'type name certificate...';
    const buttonSubmit = CreateElement(
        'button',
        'btn btn-primary',
        'Search',
        inputGroup
    );
    buttonSubmit.type = 'submit';
}

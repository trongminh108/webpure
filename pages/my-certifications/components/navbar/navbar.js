import {
    CreateElement,
    SelectOption,
} from '../../../../modules/feature_functions.js';
import { languages, websites } from '../../data.js';

export function Init(handleChangeWebsite, handleChangeLanguage, handleSearch) {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

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

    const websiteSelectTag = SelectOption(
        optionsWebsite,
        'Website',
        null,
        form
    );
    websiteSelectTag.addEventListener('change', handleChangeWebsite);

    const languageSelectTag = SelectOption(
        optionsLanguage,
        'Language',
        null,
        form
    );
    languageSelectTag.addEventListener('change', handleChangeLanguage);

    const inputGroup = CreateElement('div', 'input-group', null, form);
    const searchInput = CreateElement(
        'input',
        'form-control me-2',
        null,
        inputGroup
    );
    searchInput.type = 'search';
    searchInput.placeholder = 'type name certificate...';
    searchInput.addEventListener('keydown', handleSearch);
    // const buttonSubmit = CreateElement(
    //     'button',
    //     'btn btn-primary',
    //     'Search',
    //     inputGroup
    // );
    // buttonSubmit.type = 'submit';
}

import { certifications as cer } from './data.js';
import '../../modules/feature_functions.js';
import {
    CreateElement,
    CreateElementAnchor,
    searchIgnoreCaseAndDiacritics,
} from '../../modules/feature_functions.js';

let certifications = cer;
const ALL = 'all';
const filterState = {
    website: ALL,
    language: ALL,
    search: '',
};

function Init() {
    const container = document.querySelector('.main-container');
    const row = CreateElement('div', 'row row-certifications', null, container);
    ListCertifications(certifications, row);
}

function CertificationDiv(cer) {
    const div = CreateElement('div', 'w-50 mb-4');
    const aLink = CreateElement(
        'a',
        'text-black fs-5 fw-bold',
        `${cer.name} - ${cer.website}`,
        div
    );
    aLink.href = cer.link;
    aLink.target = '_blank';
    const image = CreateElement(
        'img',
        'w-100 border border-primary',
        null,
        div
    );
    image.src = cer.image;
    return div;
}

function CertificationCard(cer) {
    const aCard = CreateElementAnchor(cer.link, 'text-decoration-none');
    const div = CreateElement(
        'div',
        'card w-100 border border-dark',
        null,
        aCard
    );
    // div.style.minHeight = '335px';
    const img = CreateElement('img', 'card-img-top', null, div);
    img.src = cer.image;
    const divBody = CreateElement('div', 'card-body', null, div);
    const p = CreateElement(
        'p',
        'text-black fs-5 fw-bold text-truncate',
        `${cer.name} - ${cer.website}`,
        divBody
    );
    return aCard;
}

function ListCertifications(certifications, row) {
    certifications.forEach((cer) => {
        const col3 = CreateElement(
            'div',
            'col col-12 col-sm-6 col-lg-3 mb-4',
            null,
            row
        );
        col3.appendChild(CertificationCard(cer));
    });
}

export function handleChangeWebsite(event) {
    const value = event.target.value;
    filterState.website = value;
    handleChangeFilter();
    console.log('[FILTER]: ', filterState);
}

export function handleChangeLanguage(event) {
    const value = event.target.value;
    filterState.language = value;
    handleChangeFilter();
    console.log('[FILTER]: ', filterState);
}

export function handleSearch(event) {
    const key = event.key;
    const value = event.target.value;
    if (key === 'Enter') {
        event.preventDefault();
        filterState.search = value;
        handleChangeFilter();
    }
    if (value.length == 1 && key == 'Backspace') {
        filterState.search = '';
        handleChangeFilter();
    }
    console.log(key);
}

function handleChangeFilter() {
    certifications = cer;

    if (filterState.search != '') {
        // console.log(filterState.search);
        certifications = certifications.filter((cer) =>
            searchIgnoreCaseAndDiacritics(cer.name, filterState.search)
        );
    }

    if (filterState.website !== ALL) {
        certifications = certifications.filter(
            (cer) => cer.website === filterState.website
        );
    }
    if (filterState.language !== ALL) {
        certifications = certifications.filter((cer) => {
            if (
                Array.isArray(cer.language) &&
                cer.language.includes(filterState.language)
            )
                return true;
            return cer.language === filterState.language;
        });
    }

    console.log(certifications);
    const row = document.querySelector('.row-certifications');
    row.replaceChildren();
    // if (certifications.length != 0)
    ListCertifications(certifications, row);
    // else alert('Tui chưa có chứng chỉ này, hãy đề xuất cho tui :>');
}

Init();

import { certifications } from './data.js';
import '../../modules/feature_functions.js';
import {
    CreateElement,
    CreateElementAnchor,
} from '../../modules/feature_functions.js';

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
    div.style.height = '291px';
    const img = CreateElement('img', 'card-img-top', null, div);
    img.src = cer.image;
    const divBody = CreateElement('div', 'card-body', null, div);
    const p = CreateElement(
        'p',
        'text-black fs-5 fw-bold',
        `${cer.name} - ${cer.website}`,
        divBody
    );
    return aCard;
}

function Init() {
    const container = document.querySelector('.main-container');
    const rowBegin = CreateElement(
        'div',
        'row',
        certifications.length,
        container
    );
    const row = CreateElement('div', 'row', null, container);
    certifications.forEach((cer) => {
        // row.appendChild(CertificationDiv(cer));
        const col3 = CreateElement('div', 'col col-3 mb-4', null, row);
        col3.appendChild(CertificationCard(cer));
    });
}

Init();

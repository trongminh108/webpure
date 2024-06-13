import { FOREST } from '../../constants/palette.js';
import { MY_INFO } from '../../data/my-info.js';

export function Init() {
    const container = document.querySelector('#footer-container');
    container.style.backgroundColor = FOREST['background'];

    //Mail and Phone
    const mail = container.querySelector('#f-mail');
    mail.target = '_blank';
    mail.href = 'mailto:' + MY_INFO.email;
    mail.textContent = MY_INFO.email;

    const phone = container.querySelector('#f-phone');
    phone.textContent = 'Phone: ' + MY_INFO.phone;

    // Link Contact
    const aFb = container.querySelector('#f-facebook');
    aFb.target = '_blank';
    aFb.href = MY_INFO.facebook;

    const aYt = container.querySelector('#f-youtube');
    aYt.target = '_blank';
    aYt.href = MY_INFO.youtube;

    const aLi = container.querySelector('#f-linkedin');
    aLi.target = '_blank';
    aLi.href = MY_INFO.linkedin;

    const aGh = container.querySelector('#f-github');
    aGh.target = '_blank';
    aGh.href = MY_INFO.github;
}

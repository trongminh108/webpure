export function CreateElement(
    tag,
    classes = null,
    innerText = null,
    parent = null
) {
    const res = document.createElement(tag);
    if (classes) res.classList.add(...classes.split(' '));
    if (innerText) res.innerText = innerText;
    if (parent) parent.appendChild(res);
    return res;
}

export function CreateElementAnchor(
    href,
    classes = null,
    innerText = null,
    parent = null
) {
    const res = document.createElement('a');
    res.href = href;
    res.target = '_blank';
    if (classes) res.classList.add(...classes.split(' '));
    if (innerText) res.innerText = innerText;
    if (parent) parent.appendChild(res);
    return res;
}

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

export function SelectOption(options, label = null, defaultValue = null) {
    const inputGroup = CreateElement('div', 'input-group');
    // <div class="input-group">
    //     <label class="input-group-text" for="inputGroupSelect02">
    //         Website
    //     </label>
    //     <select class="form-select" id="inputGroupSelect02">
    //         <option selected>Choose...</option>
    //         <option value="1">One</option>
    //         <option value="2">Two</option>
    //         <option value="3">Three</option>
    //     </select>
    // </div>
    const labelTag = CreateElement(
        'label',
        'input-group-text',
        label,
        inputGroup
    );
    const selectTag = CreateElement('select', 'form-select', null, inputGroup);
    options.forEach((option) => {
        const optionTag = CreateElement(
            'option',
            null,
            option.value,
            selectTag
        );
        optionTag.value = option.id;
    });
    return inputGroup;
}

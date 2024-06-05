export function CreateElement(
    tag,
    classes = null,
    innerText = null,
    parent = null
) {
    const res = document.createElement(tag);
    if (classes) res.classList.add(...classes.split(' '));
    if (innerText) res.innerText = innerText;
    if (parent && !parent.contains(res)) parent.appendChild(res);
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

export function SelectOption(
    options,
    label = null,
    defaultValue = null,
    parent = null
) {
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
    if (parent) parent.appendChild(inputGroup);
    return inputGroup;
}

export function searchIgnoreCaseAndDiacritics(text, keyword) {
    const normalizedText = text.toLowerCase();
    const normalizedKeyword = keyword.toLowerCase();

    const removeDiacritics = (str) => {
        return str
            .normalize('NFD') // Chuẩn hóa chuỗi thành Unicode (NFD)
            .replace(/[\u0300-\u036f]/g, ''); // Loại bỏ các ký tự dấu
    };

    const normalizedTextWithoutDiacritics = removeDiacritics(normalizedText);
    const normalizedKeywordWithoutDiacritics =
        removeDiacritics(normalizedKeyword);

    return normalizedTextWithoutDiacritics.includes(
        normalizedKeywordWithoutDiacritics
    );
}

//==================== Node Component=====================================
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

//==================== MATH =====================================
export function getNumRanInt(min, max) {
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getDistancePoints(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param {number} degree
 * @returns {number} radian
 */
export function ConvertToRadian(degree) {
    return (degree * Math.PI) / 180;
}

/**
 *
 * @param {number} a a edge
 * @param {number} b b edge
 * @param {number} c c edge
 * @returns {number} angle of C (degrees)
 * @example
 *             P1(A)
 *             *
 *      b   *  *
 *      *)     * c
 *   * * * * * *
 * P2(C)  a   P3(B)
 */
export function calculateAngle(a, b, c, angle = 'c') {
    // Calculate the cosine of angle C using the law of cosines
    let cosAngle;
    switch (angle.toLowerCase()) {
        case 'a':
            cosAngle = (b * b + c * c - a * a) / (2 * b * c);
            break;
        case 'b':
            cosAngle = (a * a + c * c - b * b) / (2 * a * c);
            break;
        case 'c':
        default:
            cosAngle = (a * a + b * b - c * c) / (2 * a * b);
            break;
    }

    // Calculate the angle in radians
    const angleInRadians = Math.acos(cosAngle);

    // Convert the angle from radians to degrees
    const angleInDegrees = angleInRadians * (180 / Math.PI);

    return angleInDegrees;
}

//==================== Search =====================================
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

//==================== TOASTIFY =====================================
//import html file
/**
 * css:
        <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css"
        />
 */
/*
    js: 
        <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/toastify-js"
        ></script>
*/
/**
 *
 * @param {string} message
 * @param {string} status
 * @returns {undefined}
 */
export function ShowToastify(message, status = 'info') {
    Toastify({
        text: message,
        duration: 2000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'bottom', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: status + ' toastify-bounce',

        onClick: function () {}, // Callback after click
    }).showToast();
}

//==================== FILES =====================================
// Function to download data to a file
export function ExportFile(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        // Others
        var a = document.createElement('a'),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

export function ImportFile() {
    return new Promise((resolve, reject) => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const fileContent = e.target.result;
                    resolve(fileContent); // Resolve the promise with file content
                };

                reader.onerror = (error) => {
                    reject(error); // Reject the promise on error
                };

                reader.readAsText(file); // Read file as text
            }
        });

        fileInput.click();
    });
}

const STC = 4;
let tongSTC_TA = 12;

function getDTA(arr) {
    return arr.reduce((acc, curr) => {
        if (!isNaN(curr)) return acc + curr * STC;
        tongSTC_TA -= 4;
        return acc;
    }, 0);
}

function getValues(selector) {
    const arr = [];
    const eleDiem = document.querySelectorAll(selector);
    for (const d of eleDiem) {
        arr.push(parseFloat(d.value));
    }
    return arr;
}

const btnCal = document.querySelector('.btnCal');

btnCal.addEventListener('click', () => {
    const x = parseFloat(document.querySelector('.d10').value);
    const c = parseInt(document.querySelector('.stc').value);
    const dta = getValues('.dta');
    const ab = getDTA(dta);
    const res = (x * c - ab) / (c - tongSTC_TA);

    alert(`Sau khi xét điểm M: ${res}`);
});

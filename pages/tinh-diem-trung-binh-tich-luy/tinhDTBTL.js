function Sum(arr) {
    return arr.reduce((acc, curr) => {
        if (!isNaN(curr)) return acc + curr;
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
const btnAddRow = document.querySelector('.btnAddRow');
const rowsScore = document.querySelector('.rowsScore');
const row = document.querySelector('.row');
let rowCount = rowsScore.childElementCount - 1;

btnCal.addEventListener('click', () => {
    const diem = getValues('.d10');
    const stc = getValues('.stc');
    const tongSTC = Sum(stc);
    let res = 0;
    for (const i in diem) {
        if (!isNaN(diem[i] * stc[i])) res += diem[i] * stc[i];
    }
    res = Math.round((res / tongSTC) * 100) / 100;
    alert(res);
});

btnAddRow.addEventListener('click', () => {
    const child = row.cloneNode(true);
    const tds = child.children;
    tds[0].innerText = ++rowCount;

    tds[1].children[0].classList = `d10 r${rowCount}`;
    tds[1].children[0].value = null;

    tds[2].children[0].classList = `stc r${rowCount}`;
    tds[2].children[0].value = null;

    rowsScore.appendChild(child);
});

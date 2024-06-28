const green = '\x1b[32m';
const yellow = '\x1b[33m';
const reset = '\x1b[0m';

function FormatColor(str, color) {
    return `${color}${str}${reset}`;
}

console.log(FormatColor('green', green));
console.log(FormatColor('yellow', yellow));

export function CreateElement(name, classes) {
    const res = document.createElement(name);
    res.classList.add(...classes);
    return res;
}

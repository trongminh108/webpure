function SplitString(str) {
    let arr = [];
    let money = "";
    for (let ch of str) {
        if (!isNaN(ch) && ch !== " ") money += ch;
        else {
            if (money != "") arr.push(money);
            money = "";
        }
    }
    if (!isNaN(money)) arr.push(money);
    return arr;
}

let salary = "1000$ - 5000$ -jvhcgdtyg $1000 12345";
console.log(SplitString(salary));

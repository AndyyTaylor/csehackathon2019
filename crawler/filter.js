
const fs = require('fs');

const products = require('./products.json');

const byType = {};
for (let i = 0; i < products.length; i++) {
    const keys = Object.keys(products[i]);
    let valid = JSON.stringify(products[i]) != '{}';
    for (let j = 0; j < keys.length; j++) {
        if (!products[i][keys[j]]) {
            valid = false;
            console.log('missing', keys[j]);
            break;
        }
    }

    if (valid) {
        if (!Object.keys(byType).includes(products[i].type)) {
            byType[products[i].type] = [];
        }

        byType[products[i].type].push(products[i]);
    }
}

let total = 0;
for (let i = 0; i < Object.keys(byType).length; i++) {
    const type = Object.keys(byType)[i];
    console.log(`${type} x ${byType[type].length}`);
    total += byType[type].length;

    fs.writeFileSync(`./${type}.json`, JSON.stringify(byType[type]));
}
console.log(`${total} valid products found (out of ${products.length})`);
// fs.writeFileSync('./validproducts.html', JSON.stringify(validProducts));

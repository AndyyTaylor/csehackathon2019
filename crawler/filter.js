
const fs = require('fs');

const products = require('./products.json');

const validProducts = [];
for (let i = 0; i < products.length; i++) {
    const keys = Object.keys(products[i]);
    let valid = true;
    for (let j = 0; j < keys.length; j++) {
        if (!products[i][keys[j]]) {
            valid = false;
            console.log('missing', keys[j]);
            break;
        }
    }

    if (valid) {
        validProducts.push(products[i]);
    }
}

console.log(`${validProducts.length} valid products found (out of ${products.length})`);
fs.writeFileSync('./validproducts.html', JSON.stringify(validProducts));

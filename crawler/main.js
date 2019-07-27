
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const websites = [
    {
        name: 'Appliances Online',
        baseUrl: 'https://www.appliancesonline.com.au',
        searchUrl: 'https://www.appliancesonline.com.au/filter/{type}/?brand={brand}&isgridview=true&currentpage={page}&sortkey=lowestprice',
        filters: [
            {
                name: 'page',
                values: [
                    1
                ]
            }, {
                name: 'brand',
                values: [
                    'asko',
                    'arc',
                    'artusi',
                    'baumatic',
                    'beko',
                    'blanco',
                    'bosch',
                    'bromic',
                    'chiq',
                    'delonghi',
                    'dishlex',
                    'dometic',
                    'electrolux',
                    'esatto',
                    'euro%20appliances',
                    'euromaid',
                    'emilia',
                    'esatto',
                    'fisher%20%26%20paykel',
                    'germanica',
                    'gorenje',
                    'haier',
                    'hoover',
                    'hisense',
                    'husky',
                    'ilve',
                    'inalto',
                    'kelvinator',
                    'lg',
                    'lemair',
                    'liebherr',
                    'midea',
                    'mitsubishi%20electric',
                    'neff',
                    'omega',
                    'palsonic',
                    'rinnai',
                    'samsung',
                    'scandium',
                    'simpson',
                    'seiki',
                    'siemens',
                    'sharp',
                    'smeg',
                    'speed%20queen',
                    'teka',
                    'westinghouse',
                    'whirlpool',
                    'v-zug'
                ]
            }, {
                name: 'type',
                values: [
                    'dishwashers',
                    'washers-and-dryers/dryers',
                    'refrigeration/fridges'
                ]
            }
        ], selectors: [
            {
                name: 'productUrl',
                // css: '#refine > div.filter-page-content-container > section.main-content > div.grid-container-flex.ng-star-inserted > aol-product:nth-child(n) > div > div > div > div.body > a > div.mediaWrapper > aol-media-item > a'
                css: [
                    '#refine > div.filter-page-content-container > section.main-content > div.grid-container-flex.ng-star-inserted > aol-product:nth-child(n) > div > div > div > div.body > div.mediaWrapper > a:nth-child(2)',
                    '#refine > div.filter-page-content-container > section.main-content > div.grid-container-flex.ng-star-inserted > aol-product:nth-child(n) > div > div > div > div.body > a > div.mediaWrapper > aol-media-item > a'
                ]
            }, {
                name: 'title',
                // css: '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-b > div > div > div.product-details > div > aol-product-summary > div > div.content-top > aol-product-title > h1'
                css: [
                    '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-a > div > div.title > h1 > span:nth-of-type(2)',
                    '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-b > div > div > div.product-details > div > aol-product-summary > div > div.content-top > aol-product-title > h1'
                ]
            }, {
                name: 'price',
                css: [
                    '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-a > div > div.content > div.product-details > div.summary > aol-product-summary > div > div.price-wrapper > aol-product-price-details > div > div.product-details-price > div.__price > span:nth-child(2)',
                    '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-b > div > div > div.product-details > div > aol-product-summary > div > div.content-bottom > div.price > aol-product-price-details > div > div.product-details-price > div.__price > span:nth-child(2)'
                ]
            }, {
                name: 'image',
                type: 'image',
                css: [
                    '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-a > div > div.content > div.product-view > div > aol-product-attribute-badges > ul > li:nth-child(1) > img',
                    '#page-container > aol-product-page-container > aol-product-page > ul > li:nth-child(1) > div > aol-product-page-content-top > aol-product-page-content-top-b > div > div > div.media-gallery > aol-product-media-gallery > section > aol-product-media-gallery-main-image-portal > div > div > div:nth-child(1) > aol-product-media-gallery-item > div > img'
                ]
            }, {
                type: 'table',
                rowcss: 'aol-product-specifications-attribute-row',
                colcss: 'div',
                mapping: {
                    'brand': {
                        name: 'company'
                    }, 'model number': {
                        name: 'model'
                    }, 'height (mm)': {
                        name: 'height',
                        regex: /\d+/
                    }, 'width (mm)': {
                        name: 'width',
                        regex: /\d+/
                    }, 'depth (mm)': {
                        name: 'length',
                        regex: /\d+/
                    }, 'energy star rating': {
                        name: 'stars',
                        regex: /\d+/
                    }, 'total volume': {
                        name: 'volume',
                        regex: /\d+/
                    }
                }
            }
        ]
    }
];

function incrementFilters(site, filterIndex) {
    filterIndex[0] += 1;
    let ind = 0;
    while (ind < site.filters.length && filterIndex[ind] >= site.filters[ind].values.length) {
        filterIndex[ind] = 0;
        filterIndex[ind + 1] += 1;

        ind += 1;
    }

    return ind < site.filters.length;
}

function getTypeFromUrl(url) {
    const types = ['fridge', 'dryer', 'dishwasher'];

    for (let i = 0; i < types.length; i++) {
        if (url.includes(types[i])) {
            return types[i];
        }
    }

    return null;
}

function scrapeFeedPage(site, filterIndex) {
    return new Promise((resolve, reject) => {
        let searchUrl = site.searchUrl;
        for (let i = 0 ; i < site.filters.length; i++) {
            searchUrl = searchUrl.replace('{' + site.filters[i].name + '}', site.filters[i].values[filterIndex[i]]);
        }

        console.log('>>', searchUrl);

        request('https://1x1k6qg4nd.execute-api.ap-southeast-2.amazonaws.com/prod/fullhtml', {
            json: {
                url: searchUrl
            }
        }, function(err, res, body) {
            if (err) {
               return reject(err);
            }

            // console.log(body);
            // fs.writeFileSync('./scrape.html', body.html);
            let $;
            try {
                $ = cheerio.load(body.html);
            } catch(e) {
                console.log(e);
                return resolve([]);
            }
            const data = [];
            let ind = 0;
            while (ind < site.selectors[0].css.length && data.length == 0) {
                $(site.selectors[0].css[ind]).each((i, elem) => {
                    let href = elem.attribs.href;

                    if (href) {
                        if (href[0] == '/') {
                            href = site.baseUrl + href;
                        }

                        data.push(href);
                    }
                    console.log(href);
                });

                ind += 1;
            }

            resolve({ productLinks: data, type: getTypeFromUrl(searchUrl) });
        });
    })
}

function scrapeProductPage(site, productUrl, type, callback) {
    request('https://1x1k6qg4nd.execute-api.ap-southeast-2.amazonaws.com/prod/fullhtml', {
        json: {
            url: productUrl
        }
    }, function(err, res, body) {
        if (err) {
            return callback(err);
        }

        const data = {
            productUrl: productUrl
        };
        fs.writeFileSync('./product.html', body.html);
        let $;
        try {
            $ = cheerio.load(body.html);
        } catch(e) {
            console.log(body.html);
            console.log(e);
            return callback(null, {});
        }
        for (let i = 0; i < site.selectors.length; i++) {
            const selector = site.selectors[i];

            if (selector.name == 'productUrl') {
                continue;
            }

            if (selector.type == 'image') {
                if (typeof selector.css == 'string') {
                    let src = $(selector.css).eq(0).attr('src');
                    if (src && src[0] == '/') {
                        src = site.baseUrl + src;
                    }

                    data[selector.name] = src;
                } else {
                    let ind = 0;
                    while (!data[selector.name] && ind < selector.css.length) {
                        let src = $(selector.css[ind]).eq(0).attr('src');
                        if (src && src[0] == '/') {
                            src = site.baseUrl + src;
                        }

                        data[selector.name] = src;
                        // console.log("NETX SELECTOR");
                        ind += 1;
                    }
                }
            } else if (selector.type == 'table') {
                const table = [];
                $(selector.rowcss).each(function(i, elem) {
                    let key, val;
                    $(this).children().each((i, elem2) => {
                        if (!key) {
                            key = $(elem2).text().trim().toLowerCase();
                        } else {
                            val = $(elem2).text().trim().toLowerCase();
                        }
                    });

                    if (Object.keys(selector.mapping).includes(key)) {
                        if (selector.mapping[key].regex) {
                            val = val.match(selector.mapping[key].regex)[0];
                        }
                        data[selector.mapping[key].name] = val;
                    }
                });

            } else {
                if (typeof selector.css == 'string') {
                    data[selector.name] = $(selector.css).eq(0).text().trim();
                } else {
                    let ind = 0;
                    while (!data[selector.name] && ind < selector.css.length) {
                        data[selector.name] = $(selector.css[ind]).eq(0).text().trim();
                        // console.log("NETX SELECTOR");
                        ind += 1;
                    }
                }
            }
        }


        data.type = type;
        console.log('#', productUrl);
        console.log(data);

        callback(null, data);
    });
}

async function runner() {
    for (let i = 0; i < websites.length; i++) {
        const site = websites[i];
        console.log('=== Scraping', site.name);

        const filterIndex = site.filters.map(() => { return 0 });
        let cont = true;
        let products = [];
        while (cont) {
            const { productLinks, type } = await scrapeFeedPage(site, filterIndex);

            async.concat(productLinks, (productUrl, callback) => {
                scrapeProductPage(site, productUrl, type, callback);
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    if (!res) return;
                }

                products = products.concat(res);
                console.log(products);
            });

            cont = incrementFilters(site, filterIndex);

            fs.writeFileSync('./products.json', JSON.stringify(products));
        }
    }
}

runner();

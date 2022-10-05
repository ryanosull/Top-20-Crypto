const baseUrl = 'https://data.messari.io/api/v2/assets'

const table = document.createElement('table')


function fetchData() {
    fetch(baseUrl)
    .then(response => response.json())
    .then(messariData => renderMessariData(messariData))
};

fetchData();

function renderMessariData(messariData){
    console.log(messariData) // putting this on browser to always have access
    messariData.data.forEach((assetData) => renderAssetData(assetData))
};



function renderAssetData (assetData) {
    const tableRow = document.createElement('tr') // 'tr' is table row   //create row, attach items to row, attach row to table, then next row
    const tableNameCol = document.createElement('td') // 'td' is table column 
    table.appendChild(tableRow)
    tableNameCol.textContent = assetData.name
    tableRow.appendChild(tableNameCol) //row is parent, column is child

    const tableSymbol = document.createElement('td')
    const tablePrice = document.createElement('td')

    tableSymbol.textContent = assetData.symbol
    tablePrice.textContent = `$ ${assetData.metrics.market_data.price_usd.toFixed(2)}` // want to restrict to 2 decimal places - toFixed(2)?  YES!

    tableRow.appendChild(tableSymbol)
    tableRow.appendChild(tablePrice)

    tableRow.onclick = () => {
        renderAthData(assetData) // going to include ath data, MC data, market, ROI
        renderMarketCapData(assetData)
        renderMarketData(assetData)
    };
    
    //const assetName = assetData.name
};

const cryptoBody = document.getElementById('crypto-project-body'); // parent 
cryptoBody.appendChild(table);


//make new td for symbol, price, append to row

// ATH section below - these have to be in top-level scope in order to not print multiple times to DOM
//const athSection = document.createElement('h2') // !! still need this header to appear: All Time High Data
const athPrice = document.createElement('li');
const athTime = document.createElement('li');
const athPercentDown = document.createElement('li');
const athMultiplier = document.createElement('li');

const athData = document.getElementById('ath-data');
athData.appendChild(athPrice);
athData.appendChild(athTime);
athData.appendChild(athPercentDown);
athData.appendChild(athMultiplier);

function renderAthData (assetData) {  
    athPrice.textContent = `$ ${assetData.metrics.all_time_high.price.toFixed(2)}`
    athTime.textContent = `Date: ${assetData.metrics.all_time_high.at.split("T")[0]}` 
    athPercentDown.textContent = `Percent down from ATH: ${assetData.metrics.all_time_high.percent_down.toFixed(2)} %`
    athMultiplier.textContent = `ATH Multiplier (current price * multiplier = ATH price): ${assetData.metrics.all_time_high.breakeven_multiple.toFixed(2)}`

};

// Market Cap Section below

const marketCap = document.createElement('li');
const dominance = document.createElement('li');
const rank = document.createElement('li');

const marketCapData = document.getElementById('market-cap-data');
marketCapData.appendChild(marketCap);
marketCapData.appendChild(dominance);
marketCapData.appendChild(rank);

function renderMarketCapData (assetData) {
    marketCap.textContent = `$ ${assetData.metrics.marketcap.current_marketcap_usd.toFixed(2)}`
    dominance.textContent = `${assetData.metrics.marketcap.marketcap_dominance_percent.toFixed(2)} %`
    rank.textContent = assetData.metrics.marketcap.rank
};  

// Market Data section below


const twentyFourHourChange = document.createElement('li');
const twentyFourHourVolume = document.createElement('li');

const marketData = document.getElementById('market-data');

marketData.appendChild(twentyFourHourChange);
marketData.appendChild(twentyFourHourVolume);

function renderMarketData (assetData) {
    twentyFourHourChange.textContent = `${assetData.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)} %`
    twentyFourHourVolume.textContent = `$ ${assetData.metrics.market_data.volume_last_24_hours.toFixed(2)}`
};

// ROI Data below









// 'li' bullets are persisting !!
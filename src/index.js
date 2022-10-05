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
    messariData.data.forEach((assetData) => renderAssetTable(assetData))
};



function renderAssetTable (assetData) {
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
        renderRoiData(assetData)

    };
    
    //const assetName = assetData.name
};

const cryptoBody = document.getElementById('crypto-project-body'); // parent 
cryptoBody.appendChild(table);


//make new td for symbol, price, append to row

// ATH section below - these have to be in top-level scope in order to not print multiple times to DOM
//const athSection = document.createElement('h2') // !! still need this header to appear: All Time High Data
//


    // table header test
    // const header = table.createTHead
    // const row = header.insertRow(0)
    // // const cell = row.insertCell(0)
    // cell.innerHTML = "give me head"
    // let header = table.createTHead
    // header.textContent = "test"


    // // section header test
    // const athHeader = createElement('h2')
    // athHeader.textContent = "All Time High Data"
    // athData.appendChild(athHeader)



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
    athPrice.textContent = `All Time High (ATH): $ ${assetData.metrics.all_time_high.price.toFixed(2)}`  
    athTime.textContent = `Date: ${assetData.metrics.all_time_high.at.split("T")[0]}` 
    athPercentDown.textContent = `Percent Down from ATH: -${assetData.metrics.all_time_high.percent_down.toFixed(2)} %` // note percent down is postive number. 
    athMultiplier.textContent = `ATH Multiplier (current price * multiplier = ATH price): ${assetData.metrics.all_time_high.breakeven_multiple.toFixed(3)}`

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
    marketCap.textContent = `Current Market Cap: $ ${assetData.metrics.marketcap.current_marketcap_usd.toFixed(2)}`
    dominance.textContent = `Market Dominance: ${assetData.metrics.marketcap.marketcap_dominance_percent.toFixed(2)} %`
    rank.textContent = `Current Rank: ${assetData.metrics.marketcap.rank}`
};  

// Market Data section below


const twentyFourHourChange = document.createElement('li');
const twentyFourHourVolume = document.createElement('li');

const marketData = document.getElementById('market-data');

marketData.appendChild(twentyFourHourChange);
marketData.appendChild(twentyFourHourVolume);

function renderMarketData (assetData) {
    twentyFourHourChange.textContent = `24hr Change: ${assetData.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)} %`
    twentyFourHourVolume.textContent = `24hr Volume: $ ${assetData.metrics.market_data.volume_last_24_hours.toFixed(2)}`

};

// ROI Data below

const weekChange = document.createElement('li');
const monthChange = document.createElement('li');
const yearChange = document.createElement('li');
const ytdChange = document.createElement('li');

const roiData = document.getElementById('roi-data');

roiData.appendChild(weekChange);
roiData.appendChild(monthChange);
roiData.appendChild(yearChange);
roiData.appendChild(ytdChange);


function renderRoiData (assetData) {
    weekChange.textContent = `Week Change: ${assetData.metrics.roi_data.percent_change_last_1_week.toFixed(2)} %`
    monthChange.textContent = `Month Change: ${assetData.metrics.roi_data.percent_change_last_1_month.toFixed(2)} %`
    yearChange.textContent = `Year Change: ${assetData.metrics.roi_data.percent_change_last_1_year.toFixed(2)} %` // endpoint is null for STETH (less than a year old)
    ytdChange.textContent = `YTD Change: ${assetData.metrics.roi_data.percent_change_year_to_date.toFixed(2)} %`
};






// 'li' bullets are persisting !!

// hover over table, pop up window with link to "add to wallet", alert window "WARNING: NEVER CONNECT YOUR WALLET TO UNTRUSTED SITES"
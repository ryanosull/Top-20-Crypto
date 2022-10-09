const baseUrl = 'https://data.messari.io/api/v2/assets'
// table
const table = document.createElement('table')
const headerRow = document.createElement('tr')
table.appendChild(headerRow)
nameHeader = document.createElement('th')
symbolHeader = document.createElement('th')
priceHeader = document.createElement('th')

nameHeader.textContent = "Name"
symbolHeader.textContent = "Symbol"
priceHeader.textContent = "Price"

headerRow.appendChild(nameHeader)
headerRow.appendChild(symbolHeader)
headerRow.appendChild(priceHeader)
// table ^

//title 
const titleTab = document.getElementById('title')
titleTab.textContent = 'Top 20 Tickers'



// connect wallet form
const connectWallet = document.getElementById('connect-button');
connectWallet.textContent = "connect wallet";
const emailAddress = document.getElementById('e-mail-address');
emailAddress.textContent = "e-mail address:";
const walletAddress = document.getElementById('wallet-address');
walletAddress.textContent = "wallet address:";
const form = document.getElementById('wallet-form');


form.onsubmit = (event) => {
    event.preventDefault()
    window.alert('WARNING: NEVER CONNECT YOUR WALLET TO AN UNTRUSTED SOURCE!');
};
// connect wallet form ^


function fetchData() {
    fetch(baseUrl)
    .then(response => response.json())
    .then(messariData => renderMessariData(messariData))
};

fetchData(); // set timeout, see notes bottom of page

// // setTimeout
// // function sayHello () {
// //     console.log("hello")
// // };


// setInterval( () => {      // this reprints table repeatedly  if passed fetchData()
//     renderMessariData();
// }, "10000")




function renderMessariData(messariData){
    console.log(messariData) // putting this on browser to always have access
    messariData.data.forEach((assetData) => renderAssetTable(assetData))
};

const cryptoBody = document.getElementById('crypto-project-body'); // parent 
cryptoBody.appendChild(table);


function renderAssetTable (assetData) {
    const tableRow = document.createElement('tr') // 'tr' is table row   //create row, attach items to row, attach row to table, then next row
    const tableNameCol = document.createElement('td') // 'td' is table column 
    table.appendChild(tableRow)
    tableNameCol.textContent = assetData.name
    tableRow.appendChild(tableNameCol) //row is parent, column is child


    const tableSymbol = document.createElement('td')
    const tablePrice = document.createElement('td')

    tableSymbol.textContent = assetData.symbol
    tablePrice.textContent = `$ ${assetData.metrics.market_data.price_usd.toFixed(5)}` // changed to (5) in order to view price for SHIB

    tableRow.appendChild(tableSymbol)
    tableRow.appendChild(tablePrice)

    tableRow.onclick = () => {
        renderAthData(assetData) 
        renderMarketCapData(assetData)
        renderMarketData(assetData)
        renderRoiData(assetData)
    };
};


//messari link
function renderMessariLink() { // something like this works in or out of function. give it a function for clarity or leave it out?
    const providedByDiv = document.createElement('div') //footer?
    const providedBySpan = document.createElement('span')
    const providedByLink = document.createElement('a')

    // providedBySpan.textContent = "test" string above black bar

    providedByLink.textContent = "API data provided by https://messari.io/" 
    providedByLink.setAttribute('target', '_blank') // to open in new tab
    providedByLink.setAttribute('href', 'https://messari.io/')

    providedBySpan.appendChild(providedByLink)
    providedByDiv.appendChild(providedBySpan)
    cryptoBody.appendChild(providedByDiv)

    // providedByLink.addEventListener("mouseover", () => {     // test works 
    //     window.alert('test')
    // })

};

renderMessariLink();


function renderAthData (assetData) {  
    const athPrice = document.createElement('li');
    const athTime = document.createElement('li');
    const athPercentDown = document.createElement('li');
    const athMultiplier = document.createElement('li');
    
    const athData = document.getElementById('ath-data');
    athData.textContent = "ATH Data:"
    
    athData.appendChild(athPrice);
    athData.appendChild(athTime);
    athData.appendChild(athPercentDown);
    athData.appendChild(athMultiplier);

    athPrice.textContent = `All Time High (ATH): $ ${assetData.metrics.all_time_high.price.toFixed(2)}`  
    athTime.textContent = `Date: ${assetData.metrics.all_time_high.at.split("T")[0]}` 
    athPercentDown.textContent = `Percent Down from ATH: -${assetData.metrics.all_time_high.percent_down.toFixed(2)} %` // note percent down is positive number. 
    athMultiplier.textContent = `ATH Multiplier (current price * multiplier = ATH price): ${assetData.metrics.all_time_high.breakeven_multiple.toFixed(3)}`
};

// Market Cap Section below


function renderMarketCapData (assetData) {
    const marketCap = document.createElement('li');
    const dominance = document.createElement('li');
    const rank = document.createElement('li');
    
    const marketCapData = document.getElementById('market-cap-data');
    marketCapData.textContent = "Market Cap Data:"

    marketCapData.appendChild(marketCap);
    marketCapData.appendChild(dominance);
    marketCapData.appendChild(rank);
    
    marketCap.textContent = `Current Market Cap: $ ${assetData.metrics.marketcap.current_marketcap_usd.toFixed(2)}`
    dominance.textContent = `Market Dominance: ${assetData.metrics.marketcap.marketcap_dominance_percent.toFixed(2)} %`
    rank.textContent = `Current Rank: ${assetData.metrics.marketcap.rank}`
};  

// Market Data section below



function renderMarketData (assetData) {
    const twentyFourHourChange = document.createElement('li');
    const twentyFourHourVolume = document.createElement('li');
    
    const marketData = document.getElementById('market-data');
    marketData.textContent = "Market Data:"
    
    marketData.appendChild(twentyFourHourChange);
    marketData.appendChild(twentyFourHourVolume);

    twentyFourHourChange.textContent = `24hr Change: ${assetData.metrics.market_data.percent_change_usd_last_24_hours.toFixed(2)} %`
    twentyFourHourVolume.textContent = `24hr Volume: $ ${assetData.metrics.market_data.volume_last_24_hours.toFixed(2)}`
};

// ROI Data below

function renderRoiData (assetData) {
    const weekChange = document.createElement('li');
    const monthChange = document.createElement('li');
    const yearChange = document.createElement('li');
    const ytdChange = document.createElement('li');

    const roiData = document.getElementById('roi-data');
    roiData.textContent = 'ROI DATA:'

    roiData.appendChild(weekChange);
    roiData.appendChild(monthChange);
    roiData.appendChild(yearChange);
    roiData.appendChild(ytdChange);

    weekChange.textContent = `Week Change: ${assetData.metrics.roi_data.percent_change_last_1_week.toFixed(2)} %`
    monthChange.textContent = `Month Change: ${assetData.metrics.roi_data.percent_change_last_1_month.toFixed(2)} %`
    yearChange.textContent = `Year Change: ${assetData.metrics.roi_data.percent_change_last_1_year.toFixed(2)} %` // endpoint is null for STETH (less than a year old)
    ytdChange.textContent = `YTD Change: ${assetData.metrics.roi_data.percent_change_year_to_date.toFixed(2)} %`
};



// hover over table, pop up window with "Buy `${assetData.symbol}`, for each row"


//set timeout for every 3 seconds for fresh fetch request (not a refresh)
//see flexbox for CSS - move data sections to right of table
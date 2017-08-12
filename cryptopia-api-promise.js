   /// Modules ///

const promiseJSON = require('request-promise-json')

   /// Constants ///

const root = 'https://www.cryptopia.co.nz/api'

const URL = {
  // Public API
  currencies:    'GetCurrencies',
  markets:       'GetMarkets',
  market:        'GetMarket',
  pairs:         'GetTradePairs',
  marketHistory: 'GetMarketHistory',
  orders:        'GetMarketOrders',
  orderGroups:   'GetMarketOrderGroups',

  // Private API
  balance:        '',
  depositAddress: '',
  openOrders:     '',
  tradeHistory:   '',
  transactions:   '',
  submitTrade:    '',
  cancelTrade:    '',
  submitTip:      '',
  submitWithdraw: '',
  submitTransfer: ''
}
Object.freeze(URL) // so the urls don't get messed up in any kind of phishing way


   /// Functions ///

// Helpers
function toPair ( pair ) {
  return Array.isArray(pair) ? pair.join('_') : pair.replace('/', '_')
}

// Net Functions
async function get ( ...url ) {
  url = [root, ...url].filter(x=>x!==void(0)).join('/')
  let response = await promiseJSON.get(url)
  if (response.Success)
    return [response.Data, response.Message]
  else
    throw response.Message
}

// Public API
function getCurrencies() {
  return get(URL.currencies)
}

function getTradePairs() {
  return get(URL.pairs)
}

function getMarkets (base, hours=24) {
  return get(URL.markets, base, hours)

}
function getMarket (pair=['BTC','USDT'], hours=24) {
  return get(URL.market, toPair(pair), hours)
}

function getMarketHistory (pair=['BTC','USDT'], hours=24) {
  return get(URL.marketHistory, toPair(pair), hours)
}

function getMarketOrders (pair=['BTC','USDT'], orderCount=100) {
  if (orderCount > 1000) console.warn("Order count can't exceed 1000")
  return get(URL.orders, toPair(pair), orderCount)
}

function getMarketOrderGroups (pairs=[['BTC','USDT']], orderCount=100) {
  if (orderCount > 1000) console.warn("Order count can't exceed 1000")
  return get(URL.orderGroups, pairs.map(p=>toPair(p)).join('-'), orderCount)
}

module.exports = {
  getCurrencies: getCurrencies,
  getTradePairs: getTradePairs,
  getMarkets: getMarkets,
  getMarket: getMarket,
  getMarketHistory: getMarketHistory,
  getMarketOrders: getMarketOrders,
  getMarketOrderGroups: getMarketOrderGroups
}

const api = require('./cryptopia-api-promise.js')

api.getMarkets(100).then(response =>
  console.log(response)
)

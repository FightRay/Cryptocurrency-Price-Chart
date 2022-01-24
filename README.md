# Cryptocurrency Prices Chart
Created for the Blox assignment (https://weareblox.com/), built using VueJS 2.6
In this project I basically imitated the behavior in their other website, BTC direct,
for displaying realtime price statistics of selected cryptocurrencies.
While doing this, I thoroughly studied their API and used it for what I needed.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

Please request access from the this hosted cors anywhere proxy in order to test locally

### Cors Anywhere for local testing (temporary)
https://cors-anywhere.herokuapp.com/corsdemo

### Components

CoinTable component, requires prop "config" to be passed
Graph component (currently contained in Home.vue, didn't have the time to component it),
acts in conjuction with CoinTable emits.

### API Extractions

### Checks prices every 10 seconds
https://cmd.btcdirect.eu/v2/price-ticker/BTC,ETH,LTC,ADA,XRP,BNB,LINK,DOGE,VET,ALGO,BAT,DASH,BCH,ATOM,ETC,EOS,XMR,XLM,TRX,ZEC

to round difference:
Math.round((diff * 100)) / 100;

### Check prices for all coins
https://app-backend.btcdirect.eu/api/prices/

### Price graph
Request URL: https://cmd.btcdirect.eu/v2/history/rates-graph/BTC/EUR
Returns a 2-dimensional array with timestamp, price values

### Delta price changes 24h
https://cmd.btcdirect.eu/history/rates-delta/BTC,ETH,LTC,ADA,XRP,BNB,LINK,DOGE,VET,ALGO,BAT,DASH,BCH,ATOM,ETC,EOS,XMR,XLM,TRX,ZEC/EUR/24

### Delta price changes 1y, called for every coin on eur/dollar toggle
https://cmd.btcdirect.eu/v2/market-data/ZEC/EUR?datapoints[]=1y

returns { roi: { 1y: value } }

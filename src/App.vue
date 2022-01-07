<script>
	import Vue from "vue";
	import VueApexCharts from 'vue-apexcharts'
	Vue.use(VueApexCharts)

	Vue.component('apexchart', VueApexCharts)

	export default {
		data() {
			return {
				proxy: true,
				proxyUrl: "https://cors-anywhere.herokuapp.com/",
				coinInfo: {
					BTC: { name: "Bitcoin" },
					LTC: { name: "Litecoin" },
					ADA: { name: "Cardano" },
					ALGO: { name: "Algorand" },
					ATOM: { name: "Cosmos" },
					BAT: { name: "Basic Attention Token" },
					BCH: { name: "Bitcoin Cash" },
					BNB: { name: "Binance Coin" },
					DASH: { name: "Dash" },
					DOGE: { name: "Dogecoin" },
					DOT: { name: "Polkadot" },
					EOS: { name: "EOS" },
					ETC: { name: "Ethereum Classic" },
					ETH: { name: "Ethereum" },
					ICX: { name: "ICON" },
					KNC: { name: "Kyber Network Crystal v2" },
					LINK: { name: "Chainlink" },
					LSK: { name: "Lisk" },
					NANO: { name: "XNO" },
					OMG: { name: "OMG Network" },
					QTUM: { name: "Qtum" },
					SNX: { name: "Synthetix" },
					TRX: { name: "TRON" },
					VET: { name: "VeChain" },
					WAVES: { name: "Waves" },
					XLM: { name: "Stellar" },
					XMR: { name: "Monero" },
					XRP: { name: "Ripple" },
					XTZ: { name: "Tezos" },
					ZEC: { name: "Zcash" },
					UNI: { name: "Uniswap" },
					SOL: { name: "Solana" },
					AAVE: { name: "Aave" },
					GRT: { name: "The Graph" },
					MANA: { name: "Decentraland" },
					STORJ: { name: "Storj" },
					YFI: { name: "yearn.finance" },
					MATIC: { name: "Polygon" },
					AXS: { name: "Axie Infinity" },
					ANKR: { name: "Ankr" },
					SAND: { name: "The Sandbox" },
					REN: { name: "Ren" }
				},
			};
		},
		created() {
			Vue.prototype.$app = this;
			Vue.prototype.$fetch = this.fetch;
		},
		mounted() {},
		methods: {
			fetch(url, method, data, actions, actionf, hasfile = false) {
				if (this.proxy) {
					url = this.proxyUrl + url;
				}

				let headers = new Headers();
				headers.append("X-Requested-With", "XMLHttpRequest");

				let requestData = {
					method: method,
					headers: headers,
					redirect: "follow",
					mode: "cors",
				};

				if (method == "POST") {
					headers.append("Content-Type", "application/x-www-form-urlencoded");
					let dataEncoded = hasfile ? new FormData() : new URLSearchParams();
					for (let key in data) {
						dataEncoded.append(key, data[key]);
					}
					requestData["body"] = dataEncoded;
				}

				fetch(url, requestData)
					.then((response) => response.json())
					.then((result) => actions(result))
					.catch((error) => actionf(error));
			},
		},
	};
</script>

<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style>

body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

@font-face {
  font-family: "GT-Walsheim-medium";
  src: local("GT-Walsheim-medium"),
   url("assets/fonts/GT-Walsheim-Medium.woff2") format("woff2");
}

@font-face {
  font-family: "GT-Walsheim-regular";
  src: local("GT-Walsheim-regular"),
   url("assets/fonts/GT-Walsheim-Regular.woff2") format("woff2");
}

</style>

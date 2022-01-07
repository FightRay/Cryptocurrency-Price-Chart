<script>
	export default {
		name: "CoinTable",
    props: ["config"],
		data() {
			return {
				coinPrices: {
          // Default values
					BTC: { EUR: 38069, USD: 43076 },
					ETH: { EUR: 2986.47, USD: 3379.27 },
					LTC: { EUR: 118.98, USD: 134.63 },
					ADA: { EUR: 1.08, USD: 1.22 },
					XRP: { EUR: 0.671306, USD: 0.7596 },
					BNB: { EUR: 411.49, USD: 465.54 },
					LINK: { EUR: 21.44, USD: 24.26 },
					DOGE: { EUR: 0.139034, USD: 0.157321 },
					VET: { EUR: 0.072842, USD: 0.082422 },
					ALGO: { EUR: 1.36, USD: 1.54 },
					BAT: { EUR: 1.01, USD: 1.15 },
					DASH: { EUR: 107.14, USD: 121.23 },
					BCH: { EUR: 348.05, USD: 393.83 },
					ATOM: { EUR: 32.66, USD: 36.95 },
					ETC: { EUR: 27.61, USD: 31.24 },
					EOS: { EUR: 2.54, USD: 2.88 },
					XMR: { EUR: 176.32, USD: 199.48 },
					XLM: { EUR: 0.239289, USD: 0.270762 },
					TRX: { EUR: 0.06218, USD: 0.070348 },
					ZEC: { EUR: 117.45, USD: 132.9 },
				},
				delta24: {
          // Default values
					EUR: {
						BTC: -6.43636,
						ETH: -7.78428,
						LTC: -9.03876,
						ADA: -6.61896,
						XRP: -8.28754,
						BNB: -7.21535,
						LINK: -0.6217,
						DOGE: -6.95649,
						VET: -5.11103,
						ALGO: -8.82179,
						BAT: -10.80789,
						DASH: -10.22199,
						BCH: -6.67061,
						ATOM: -11.11907,
						ETC: -7.44953,
						EOS: -9.83396,
						XMR: -8.50861,
						XLM: -6.11193,
						TRX: -7.8389,
						ZEC: -8.25002,
					},
					USD: {
						BTC: -6.43636,
						ETH: -7.78428,
						LTC: -9.03876,
						ADA: -6.61896,
						XRP: -8.28754,
						BNB: -7.21535,
						LINK: -0.6217,
						DOGE: -6.95649,
						VET: -5.11103,
						ALGO: -8.82179,
						BAT: -10.80789,
						DASH: -10.22199,
						BCH: -6.67061,
						ATOM: -11.11907,
						ETC: -7.44953,
						EOS: -9.83396,
						XMR: -8.50861,
						XLM: -6.11193,
						TRX: -7.8389,
						ZEC: -8.25002,
					},
				},
				delta1y: {
          // Default values
					EUR: {
						BTC: -6.43636,
						ETH: -7.78428,
						LTC: -9.03876,
						ADA: -6.61896,
						XRP: -8.28754,
						BNB: -7.21535,
						LINK: -0.6217,
						DOGE: -6.95649,
						VET: -5.11103,
						ALGO: -8.82179,
						BAT: -10.80789,
						DASH: -10.22199,
						BCH: -6.67061,
						ATOM: -11.11907,
						ETC: -7.44953,
						EOS: -9.83396,
						XMR: -8.50861,
						XLM: -6.11193,
						TRX: -7.8389,
						ZEC: -8.25002,
					},
					USD: {
						BTC: -6.43636,
						ETH: -7.78428,
						LTC: -9.03876,
						ADA: -6.61896,
						XRP: -8.28754,
						BNB: -7.21535,
						LINK: -0.6217,
						DOGE: -6.95649,
						VET: -5.11103,
						ALGO: -8.82179,
						BAT: -10.80789,
						DASH: -10.22199,
						BCH: -6.67061,
						ATOM: -11.11907,
						ETC: -7.44953,
						EOS: -9.83396,
						XMR: -8.50861,
						XLM: -6.11193,
						TRX: -7.8389,
						ZEC: -8.25002,
					},
				},
				checkTimer: undefined,
				checkTimerInterval: 10, // Interval in seconds
				currency: "EUR",
				currencySymbol: { EUR: "€", USD: "$" },
			};
		},
		created() {
			//this.setDefaultPrices();
		},
		mounted() {
      this.currency = this.config.currency;
			if (this.checkTimer !== undefined) {
				clearInterval(this.checkTimer);
			}

			this.checkPrices();
			this.checkDelta24();
			for (let coin in this.config.coins) {
				this.checkDelta1y(this.config.coins[coin]);
			}

			this.checkTimer = setInterval(() => {
				this.checkPrices();
			}, this.checkTimerInterval * 1000);
		},
		methods: {
			setDefaultPrices() {
				for (let x in this.config.coins) {
					this.coinPrices[this.config.coins[x]] = { EUR: 0, USD: 0 };
				}
			},
			getCoinIconUrl(coinName) {
				return coinName + ".svg";
			},
			getCoinPrice(coinName) {
				return (
					this.currencySymbol[this.currency] +
					this.trimPrice(this.coinPrices[coinName][this.currency])
				);
			},
			getCoinDelta24(coinName) {
				return this.delta24[this.currency][coinName];
			},
			getCoinDelta1y(coinName) {
				return this.delta1y[this.currency][coinName];
			},
			trimPrice(val) {
				return val.toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				});
			},
			checkPrices() {
				this.$fetch(
					this.config.pricesBaseUrl + this.config.coins.toString(),
					"GET",
					{},
					(result) => {
						if (result) {
							this.coinPrices = result;
						}
					},
					(error) => {
						console.log(error);
					}
				);
			},
			checkDelta24() {
				let requestUrl = this.config.delta24BaseUrl
					.replace("$currency", this.currency)
					.replace("$coinList", this.config.coins.toString());
				this.$fetch(
					requestUrl,
					"GET",
					{},
					(result) => {
						if (result && result.delta !== undefined) {
							this.delta24[this.currency] = result.delta;
						}
					},
					(error) => {
						console.log(error);
					}
				);
			},
			checkDelta1y(coinName) {
				let requestUrl = this.config.delta1yBaseUrl
					.replace("$currency", this.currency)
					.replace("$coin", coinName);
				this.$fetch(
					requestUrl,
					"GET",
					{},
					(result) => {
						if (result && result.roi !== undefined) {
							this.delta1y[this.currency][coinName] = result.roi["1y"];
						}
					},
					(error) => {
						console.log(error);
					}
				);
			},
      viewGraph(coinName) {
        this.$emit("viewAction", coinName, this.currency);
      }
		},
	};
</script>

<template>
	<div class="table-wrapper">
		<table>
			<tr>
				<th>#</th>
				<th class="align-left">CRYPTOCURRENCY</th>
				<th class="align-right">PRICE</th>
				<th class="align-right">24 HOURS DIFFERENCE</th>
				<th class="align-right">YEAR DIFFERENCE</th>
				<th>Stats</th>
			</tr>
			<template v-for="item, index in config.coins">
				<tr :key="index">
					<td>{{ index + 1 }}</td>
					<td class="align-left">
						<div class="name-container">
							<div
								:style="'background-image: url(img/coins/' + getCoinIconUrl(item) + ');'"
								class="coin-icon"
							></div><span class="base-value">{{ item }}</span> <span>{{ $app.coinInfo[item].name }}</span>
						</div>
					</td>
					<td class="align-right"><span class="base-value">{{ getCoinPrice(item) }}</span></td>
					<td class="align-right"><span
							class="base-value"
							:style="getCoinDelta24(item) < 0 ? 'color: #fa4746;' : 'color: #1ed760;'"
						>{{ (getCoinDelta24(item) > 0 ? '+ ' : '') + trimPrice(getCoinDelta24(item)) }}%</span></td>
					<td class="align-right"><span
							class="base-value"
							:style="getCoinDelta1y(item) < 0 ? 'color: #fa4746;' : 'color: #1ed760;'"
						>{{ (getCoinDelta1y(item) > 0 ? '+ ' : '') + trimPrice(getCoinDelta1y(item)) }}%</span></td>
					<td style="padding: 0;">
						<div class="button-view" @click="viewGraph(item)"><span class="base-value">View</span></div>
					</td>
				</tr>
			</template>
		</table>
	</div>
</template>

<style scoped>
.button-view span {
	position: absolute;
	margin: auto;
	inset: 0;
	height: max-content;
	text-align: center;
  color: #0086ff;
}

.button-view {
  position: relative;
	width: 60px;
	height: 60px;
	margin: 0 auto;
	border-radius: 10px;
	background-color: #e5f2ff;
  cursor: pointer;
}

.button-view:hover {
  filter: saturate(1.5);
}

.base-value {
	font-size: 17px;
	line-height: 24px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: GT-Walsheim-medium, Helvetica, Arial, sans-serif;
	color: #333b43;
	user-select: text;
}

.name-container span {
	margin-right: 6px;
	line-height: 24px;
}

.name-container {
	display: flex;
	align-content: center;
	flex-wrap: nowrap;
	align-items: center;
}

.align-right {
	text-align: right;
}

.align-left {
	text-align: left;
}

.coin-icon {
	width: 32px;
	height: 32px;
	display: inline-block;
	margin-right: 15px;
}

th {
	font-size: 12px;
	line-height: 12px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-family: GT-Walsheim-medium, Helvetica, Arial, sans-serif;
	color: #a1b2c4;
	text-transform: uppercase;
	font-weight: 400;
}

th,
td {
	padding: 20px;
	vertical-align: middle;
}

tr:hover {
	background-color: #fbfcfd;
}

table {
	width: 100%;
	color: #a1b2c4;
	user-select: none;
}

.table-wrapper {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #fff;
	overflow-y: auto;
}

.table-wrapper::-webkit-scrollbar {
	width: 5px;
}

.table-wrapper::-webkit-scrollbar-track {
	box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
}

.table-wrapper::-webkit-scrollbar-thumb {
	background-color: #0086ff;
	outline: 1px solid #0086ff;
	height: 5px;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}
</style>

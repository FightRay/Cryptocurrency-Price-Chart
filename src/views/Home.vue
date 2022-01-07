<script>
	import defaultGraphData from "../assets/graph.json";
	import CoinTable from "../components/CoinTable.vue";

	export default {
		components: { CoinTable },
		name: "Home",
		componenets: [CoinTable],
		data() {
			return {
				configTable: {
					coins: [
						// Default values
						"BTC",
						"ETH",
						"LTC",
						"ADA",
						"XRP",
						"BNB",
						"LINK",
						"DOGE",
						"VET",
						"ALGO",
						"BAT",
						"DASH",
						"BCH",
						"ATOM",
						"ETC",
						"EOS",
						"XMR",
						"XLM",
						"TRX",
						"ZEC",
					],
					iconBaseUrl: "https://cryptoicons.org/api/icon/$coin/32",
					pricesBaseUrl: "https://cmd.btcdirect.eu/v2/price-ticker/",
					delta24BaseUrl:
						"https://cmd.btcdirect.eu/history/rates-delta/$coinList/$currency/24",
					delta1yBaseUrl:
						"https://cmd.btcdirect.eu/v2/market-data/$coin/$currency?datapoints[]=1y",
          currency: "EUR"
				},
				options: {
					series: [
						{
							name: "",
							data: [],
						},
					],
					chart: {
						type: "area",
						stacked: false,
						height: 350,
						zoom: {
							type: "x",
							enabled: true,
							autoScaleYaxis: true,
						},
						toolbar: {
							autoSelected: "zoom",
						},
					},
					dataLabels: {
						enabled: false,
					},
					markers: {
						size: 0,
					},
					title: {
						text: "Bitcoin Price Movement",
						align: "left",
					},
					fill: {
						type: "gradient",
						gradient: {
							shadeIntensity: 1,
							inverseColors: false,
							opacityFrom: 0.5,
							opacityTo: 0,
							stops: [0, 90, 100],
						},
					},
					yaxis: {
						labels: {
							formatter: function (val) {
								return val.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								});
							},
						},
						title: {
							text: "Price",
						},
					},
					xaxis: {
						type: "datetime",
					},
					tooltip: {
						shared: false,
						y: {
							formatter: function (val) {
								return val.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								});
							},
						},
					},
				},
				currency: "EUR",
				currenctSymbol: { EUR: "€", USD: "$" },
				priceGraphBaseUrl:
					"https://cmd.btcdirect.eu/v2/history/rates-graph/$coin/$currency",
				graphData: [],
			};
		},
		created() {},
		mounted() {
			this.graphData = defaultGraphData;
			this.processGraphData(defaultGraphData);
			this.$refs.coinChart.updateOptions({
				title: {
					text: "Bitcoin Price Movement (" + this.configTable.currency + ")",
				},
			});
		},
		methods: {
			processGraphData(data) {
				let newData = [];
				for (let x in data) {
					let info = data[x];

					newData.push({ x: info[0], y: info[1] });
				}
				this.options.series = [{ name: "", data: newData }];
			},
			viewGraph(coinName, currency) {
				this.$refs.coinChartWrapper.scrollIntoView();

				let requestUrl = this.priceGraphBaseUrl
					.replace("$currency", currency)
					.replace("$coin", coinName);
				this.$fetch(
					requestUrl,
					"GET",
					{},
					(result) => {
						if (result) {
							this.graphData = result;
						}
					},
					(error) => {
						console.log(error);
					}
				);

				this.$refs.coinChart.updateOptions({
					title: {
						text:
							this.$app.coinInfo[coinName].name +
							" Price Movement (" +
							currency +
							")",
					},
				});
				this.processGraphData(this.graphData);
			},
		},
	};
</script>

<template>
	<div id="home-page">
		<div id="coin-table">
			<CoinTable
				@viewAction="viewGraph"
				:config="configTable"
			/>
		</div>
		<div
			id="coin-chart"
			ref="coinChartWrapper"
		>
			<apexchart
				width="800"
				type="line"
				:options="options"
				:series="options.series"
				ref="coinChart"
			></apexchart>
		</div>
	</div>
</template>

<style scoped>
#coin-chart {
	margin: 50px auto;
	width: 700px;
}

#coin-table {
	position: relative;
	width: 60%;
	min-width: 800px;
	max-width: 100%;
	height: 600px;
	background-color: red;
	margin: 0 auto;
	margin-top: 50px;
}

#home-page {
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: #fff;
	overflow: auto;
}
</style>

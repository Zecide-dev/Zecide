function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


// console.log(JSON.stringify(_datafeed));
function initOnReady() {
	// var _datafeed = new Datafeeds.UDFCompatibleDatafeed("http://localhost:8080/getFeed",1000);
	// document.getElementById("x").innerHTML = _datafeed;
	// console.log(_datafeed);

	var widget = new TradingView.widget({
		debug: true, // uncomment this line to see Library errors and warnings in the console
		fullscreen: true,
		symbol: 'INFY.NS',
		interval: '1',
		container_id: "dashboard-chart",
		//	BEWARE: no trailing slash is expected in feed URL
		// datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com",100000),
		datafeed: new Datafeeds.UDFCompatibleDatafeed("http://localhost:8080/getFeed",10000),
		library_path: "charting_library/",
		locale: getParameterByName('lang') || "en",

		disabled_features: ["use_localstorage_for_settings"],
		enabled_features: ["study_templates"],
		charts_storage_url: 'https://saveload.tradingview.com',
		charts_storage_api_version: "1.1",
		client_id: 'tradingview.com',
		user_id: 'public_user_id',
		theme: getParameterByName('theme'),
	});

	widget.onChartReady(function() {

		widget.onRealtimeTick = function(data) {
		alert(data);
		}
	});

};
// setInterval(initOnReady,3000);
window.addEventListener('DOMContentLoaded', initOnReady, false);

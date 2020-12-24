let backendBaseURL = 'http://localhost:8000/';

// For future use
let candleSeries;
let candlestickChartData = [
  { time: '2018-10-19', open: 180.34, high: 180.99, low: 178.57, close: 179.85 },
  { time: '2018-10-22', open: 180.82, high: 181.40, low: 177.56, close: 178.75 },
  { time: '2018-10-23', open: 175.77, high: 179.49, low: 175.44, close: 178.53 },
  { time: '2018-10-24', open: 178.58, high: 182.37, low: 176.31, close: 176.97 },
  { time: '2018-10-25', open: 177.52, high: 180.50, low: 176.83, close: 179.07 },
  { time: '2018-10-26', open: 176.88, high: 177.34, low: 170.91, close: 172.23 },
  { time: '2018-10-29', open: 173.74, high: 175.99, low: 170.95, close: 173.20 },
  { time: '2018-10-30', open: 173.16, high: 176.43, low: 172.64, close: 176.24 },
  { time: '2018-10-31', open: 177.98, high: 178.85, low: 175.59, close: 175.88 },
  { time: '2018-11-01', open: 176.84, high: 180.86, low: 175.90, close: 180.46 },
  { time: '2018-11-02', open: 182.47, high: 183.01, low: 177.39, close: 179.93 },
  { time: '2018-11-05', open: 181.02, high: 182.41, low: 179.30, close: 182.19 },
  { time: '2018-11-06', open: 181.93, high: 182.65, low: 180.05, close: 182.01 },
  { time: '2018-11-07', open: 183.79, high: 187.68, low: 182.06, close: 187.23 },
  { time: '2018-11-08', open: 187.13, high: 188.69, low: 185.72, close: 188.00 },
  { time: '2018-11-09', open: 188.32, high: 188.48, low: 184.96, close: 185.99 },
  { time: '2018-11-12', open: 185.23, high: 186.95, low: 179.02, close: 179.43 },
  { time: '2018-11-13', open: 177.30, high: 181.62, low: 172.85, close: 179.00 },
  { time: '2018-11-14', open: 182.61, high: 182.90, low: 179.15, close: 179.90 },
  { time: '2018-11-15', open: 179.01, high: 179.67, low: 173.61, close: 177.36 },
  { time: '2018-11-16', open: 173.99, high: 177.60, low: 173.51, close: 177.02 },
  { time: '2018-11-19', open: 176.71, high: 178.88, low: 172.30, close: 173.59 },
  { time: '2018-11-20', open: 169.25, high: 172.00, low: 167.00, close: 169.05 },
  { time: '2018-11-21', open: 170.00, high: 170.93, low: 169.15, close: 169.30 },
  { time: '2018-11-23', open: 169.39, high: 170.33, low: 168.47, close: 168.85 },
  { time: '2018-11-26', open: 170.20, high: 172.39, low: 168.87, close: 169.82 },
  { time: '2018-11-27', open: 169.11, high: 173.38, low: 168.82, close: 173.22 },
  { time: '2018-11-28', open: 172.91, high: 177.65, low: 170.62, close: 177.43 },
  { time: '2018-11-29', open: 176.80, high: 177.27, low: 174.92, close: 175.66 },
  { time: '2018-11-30', open: 175.75, high: 180.37, low: 175.11, close: 180.32 },
  { time: '2018-12-03', open: 183.29, high: 183.50, low: 179.35, close: 181.74 },
  { time: '2018-12-04', open: 181.06, high: 182.23, low: 174.55, close: 175.30 },
  { time: '2018-12-06', open: 173.50, high: 176.04, low: 170.46, close: 175.96 },
  { time: '2018-12-07', open: 175.35, high: 178.36, low: 172.24, close: 172.79 },
  { time: '2018-12-10', open: 173.39, high: 173.99, low: 167.73, close: 171.69 },
  { time: '2018-12-11', open: 174.30, high: 175.60, low: 171.24, close: 172.21 },
  { time: '2018-12-12', open: 173.75, high: 176.87, low: 172.81, close: 174.21 },
  { time: '2018-12-13', open: 174.31, high: 174.91, low: 172.07, close: 173.87 },
  { time: '2018-12-14', open: 172.98, high: 175.14, low: 171.95, close: 172.29 },
  { time: '2018-12-17', open: 171.51, high: 171.99, low: 166.93, close: 167.97 },
  { time: '2018-12-18', open: 168.90, high: 171.95, low: 168.50, close: 170.04 },
  { time: '2018-12-19', open: 170.92, high: 174.95, low: 166.77, close: 167.56 },
  { time: '2018-12-20', open: 166.28, high: 167.31, low: 162.23, close: 164.16 },
  { time: '2018-12-21', open: 162.81, high: 167.96, low: 160.17, close: 160.48 },
  { time: '2018-12-24', open: 160.16, high: 161.40, low: 158.09, close: 158.14 },
  { time: '2018-12-26', open: 159.46, high: 168.28, low: 159.44, close: 168.28 },
  { time: '2018-12-27', open: 166.44, high: 170.46, low: 163.36, close: 170.32 },
  { time: '2018-12-28', open: 171.22, high: 173.12, low: 168.60, close: 170.22 },
  { time: '2018-12-31', open: 171.47, high: 173.24, low: 170.65, close: 171.82 },
  { time: '2019-01-02', open: 169.71, high: 173.18, low: 169.05, close: 172.41 },
  { time: '2019-01-03', open: 171.84, high: 171.84, low: 168.21, close: 168.61 },
  { time: '2019-01-04', open: 170.18, high: 174.74, low: 169.52, close: 173.62 },
  { time: '2019-01-07', open: 173.83, high: 178.18, low: 173.83, close: 177.04 },
  { time: '2019-01-08', open: 178.57, high: 179.59, low: 175.61, close: 177.89 },
  { time: '2019-01-09', open: 177.87, high: 181.27, low: 177.10, close: 179.73 },
  { time: '2019-01-10', open: 178.03, high: 179.24, low: 176.34, close: 179.06 },
  { time: '2019-01-11', open: 177.93, high: 180.26, low: 177.12, close: 179.41 },
  { time: '2019-01-14', open: 177.59, high: 179.23, low: 176.90, close: 178.81 },
  { time: '2019-01-15', open: 176.08, high: 177.82, low: 175.20, close: 176.47 },
  { time: '2019-01-16', open: 177.09, high: 177.93, low: 175.86, close: 177.04 },
  { time: '2019-01-17', open: 174.01, high: 175.46, low: 172.00, close: 174.87 },
  { time: '2019-01-18', open: 176.98, high: 180.04, low: 176.18, close: 179.58 },
  { time: '2019-01-22', open: 177.49, high: 178.60, low: 175.36, close: 177.11 },
  { time: '2019-01-23', open: 176.59, high: 178.06, low: 174.53, close: 176.89 },
  { time: '2019-01-24', open: 177.00, high: 177.53, low: 175.30, close: 177.29 },
  { time: '2019-01-25', open: 179.78, high: 180.87, low: 178.61, close: 180.40 },
  { time: '2019-01-28', open: 178.97, high: 179.99, low: 177.41, close: 179.83 },
  { time: '2019-01-29', open: 178.96, high: 180.15, low: 178.09, close: 179.69 },
  { time: '2019-01-30', open: 180.47, high: 184.20, low: 179.78, close: 182.18 },
  { time: '2019-01-31', open: 181.50, high: 184.67, low: 181.06, close: 183.53 },
  { time: '2019-02-01', open: 184.03, high: 185.15, low: 182.83, close: 184.37 },
  { time: '2019-02-04', open: 184.30, high: 186.43, low: 183.84, close: 186.43 },
  { time: '2019-02-05', open: 186.89, high: 186.99, low: 184.69, close: 186.39 },
  { time: '2019-02-06', open: 186.69, high: 186.69, low: 184.06, close: 184.72 },
  { time: '2019-02-07', open: 183.74, high: 184.92, low: 182.45, close: 184.07 },
  { time: '2019-02-08', open: 183.05, high: 184.58, low: 182.72, close: 184.54 },
  { time: '2019-02-11', open: 185.00, high: 185.42, low: 182.75, close: 182.92 },
  { time: '2019-02-12', open: 183.84, high: 186.40, low: 183.52, close: 185.52 },
  { time: '2019-02-13', open: 186.30, high: 188.68, low: 185.92, close: 188.41 },
  { time: '2019-02-14', open: 187.50, high: 188.93, low: 186.00, close: 187.71 },
  { time: '2019-02-15', open: 189.87, high: 192.62, low: 189.05, close: 192.39 },
  { time: '2019-02-19', open: 191.71, high: 193.19, low: 191.28, close: 192.33 },
  { time: '2019-02-20', open: 192.39, high: 192.40, low: 191.11, close: 191.85 },
  { time: '2019-02-21', open: 191.85, high: 192.37, low: 190.61, close: 191.82 },
  { time: '2019-02-22', open: 191.69, high: 192.54, low: 191.62, close: 192.39 },
  { time: '2019-02-25', open: 192.75, high: 193.42, low: 189.96, close: 189.98 },
  { time: '2019-02-26', open: 185.59, high: 188.47, low: 182.80, close: 188.30 },
  { time: '2019-02-27', open: 187.90, high: 188.50, low: 183.21, close: 183.67 },
  { time: '2019-02-28', open: 183.60, high: 185.19, low: 183.11, close: 185.14 },
  { time: '2019-03-01', open: 185.82, high: 186.56, low: 182.86, close: 185.17 },
  { time: '2019-03-04', open: 186.20, high: 186.24, low: 182.10, close: 183.81 },
  { time: '2019-03-05', open: 184.24, high: 185.12, low: 183.25, close: 184.00 },
  { time: '2019-03-06', open: 184.53, high: 184.97, low: 183.84, close: 184.45 },
  { time: '2019-03-07', open: 184.39, high: 184.62, low: 181.58, close: 182.51 },
  { time: '2019-03-08', open: 181.49, high: 181.91, low: 179.52, close: 181.23 },
  { time: '2019-03-11', open: 182.00, high: 183.20, low: 181.20, close: 182.44 },
  { time: '2019-03-12', open: 183.43, high: 184.27, low: 182.33, close: 184.00 },
  { time: '2019-03-13', open: 183.24, high: 183.78, low: 181.08, close: 181.14 },
  { time: '2019-03-14', open: 181.28, high: 181.74, low: 180.50, close: 181.61 },
  { time: '2019-03-15', open: 182.30, high: 182.49, low: 179.57, close: 182.23 },
  { time: '2019-03-18', open: 182.53, high: 183.48, low: 182.33, close: 183.42 },
  { time: '2019-03-19', open: 184.19, high: 185.82, low: 183.48, close: 184.13 },
  { time: '2019-03-20', open: 184.30, high: 187.12, low: 183.43, close: 186.10 },
  { time: '2019-03-21', open: 185.50, high: 190.00, low: 185.50, close: 189.97 },
  { time: '2019-03-22', open: 189.31, high: 192.05, low: 188.67, close: 188.75 },
  { time: '2019-03-25', open: 188.75, high: 191.71, low: 188.51, close: 189.68 },
  { time: '2019-03-26', open: 190.69, high: 192.19, low: 188.74, close: 189.34 },
  { time: '2019-03-27', open: 189.65, high: 191.61, low: 188.39, close: 189.25 },
  { time: '2019-03-28', open: 189.91, high: 191.40, low: 189.16, close: 190.06 },
  { time: '2019-03-29', open: 190.85, high: 192.04, low: 190.14, close: 191.89 },
  { time: '2019-04-01', open: 192.99, high: 195.90, low: 192.85, close: 195.64 },
  { time: '2019-04-02', open: 195.50, high: 195.50, low: 194.01, close: 194.31 },
  { time: '2019-04-03', open: 194.98, high: 198.78, low: 194.11, close: 198.61 },
  { time: '2019-04-04', open: 199.00, high: 200.49, low: 198.02, close: 200.45 },
  { time: '2019-04-05', open: 200.86, high: 203.13, low: 200.61, close: 202.06 },
  { time: '2019-04-08', open: 201.37, high: 203.79, low: 201.24, close: 203.55 },
  { time: '2019-04-09', open: 202.26, high: 202.71, low: 200.46, close: 200.90 },
  { time: '2019-04-10', open: 201.26, high: 201.60, low: 198.02, close: 199.43 },
  { time: '2019-04-11', open: 199.90, high: 201.50, low: 199.03, close: 201.48 },
  { time: '2019-04-12', open: 202.13, high: 204.26, low: 202.13, close: 203.85 },
  { time: '2019-04-15', open: 204.16, high: 205.14, low: 203.40, close: 204.86 },
  { time: '2019-04-16', open: 205.25, high: 205.99, low: 204.29, close: 204.47 },
  { time: '2019-04-17', open: 205.34, high: 206.84, low: 205.32, close: 206.55 },
  { time: '2019-04-18', open: 206.02, high: 207.78, low: 205.10, close: 205.66 },
  { time: '2019-04-22', open: 204.11, high: 206.25, low: 204.00, close: 204.78 },
  { time: '2019-04-23', open: 205.14, high: 207.33, low: 203.43, close: 206.05 },
  { time: '2019-04-24', open: 206.16, high: 208.29, low: 205.54, close: 206.72 },
  { time: '2019-04-25', open: 206.01, high: 207.72, low: 205.06, close: 206.50 },
  { time: '2019-04-26', open: 205.88, high: 206.14, low: 203.34, close: 203.61 },
  { time: '2019-04-29', open: 203.31, high: 203.80, low: 200.34, close: 202.16 },
  { time: '2019-04-30', open: 201.55, high: 203.75, low: 200.79, close: 203.70 },
  { time: '2019-05-01', open: 203.20, high: 203.52, low: 198.66, close: 198.80 },
  { time: '2019-05-02', open: 199.30, high: 201.06, low: 198.80, close: 201.01 },
  { time: '2019-05-03', open: 202.00, high: 202.31, low: 200.32, close: 200.56 },
  { time: '2019-05-06', open: 198.74, high: 199.93, low: 198.31, close: 199.63 },
  { time: '2019-05-07', open: 196.75, high: 197.65, low: 192.96, close: 194.77 },
  { time: '2019-05-08', open: 194.49, high: 196.61, low: 193.68, close: 195.17 },
  { time: '2019-05-09', open: 193.31, high: 195.08, low: 191.59, close: 194.58 },
  { time: '2019-05-10', open: 193.21, high: 195.49, low: 190.01, close: 194.58 },
  { time: '2019-05-13', open: 191.00, high: 191.66, low: 189.14, close: 190.34 },
  { time: '2019-05-14', open: 190.50, high: 192.76, low: 190.01, close: 191.62 },
  { time: '2019-05-15', open: 190.81, high: 192.81, low: 190.27, close: 191.76 },
  { time: '2019-05-16', open: 192.47, high: 194.96, low: 192.20, close: 192.38 },
  { time: '2019-05-17', open: 190.86, high: 194.50, low: 190.75, close: 192.58 },
  { time: '2019-05-20', open: 191.13, high: 192.86, low: 190.61, close: 190.95 },
  { time: '2019-05-21', open: 187.13, high: 192.52, low: 186.34, close: 191.45 },
  { time: '2019-05-22', open: 190.49, high: 192.22, low: 188.05, close: 188.91 },
  { time: '2019-05-23', open: 188.45, high: 192.54, low: 186.27, close: 192.00 },
  { time: '2019-05-24', open: 192.54, high: 193.86, low: 190.41, close: 193.59 },
];

const chartCreation = () => {
  var chart = LightweightCharts.createChart(document.getElementById('candlestick-chart'), {
    // width: 600,
    // height: 300,
    layout: {
      backgroundColor: '#FFF',
      textColor: '#000',
    },
    grid: {
      vertLines: {
        color: 'rgba(197, 203, 206, 0.5)',
      },
      horzLines: {
        color: 'rgba(197, 203, 206, 0.5)',
      },
    },
    crosshair: {
      mode: LightweightCharts.CrosshairMode.Normal,
    },
    rightPriceScale: {
      borderColor: 'rgba(197, 203, 206, 0.8)',
    },
    timeScale: {
      borderColor: 'rgba(197, 203, 206, 0.8)',
      timeVisible: true,
      secondsVisible: false
    },
    localization: {
      locale: 'en-IN',
    }
  });

  candleSeries = chart.addCandlestickSeries({
    upColor: 'rgba(255, 144, 0, 1)',
    downColor: '#000',
    borderDownColor: 'rgba(255, 144, 0, 1)',
    borderUpColor: 'rgba(255, 144, 0, 1)',
    wickDownColor: 'rgba(255, 144, 0, 1)',
    wickUpColor: 'rgba(255, 144, 0, 1)',
  });

  candleSeries.setData(candlestickChartData);

  // Resizing chart when window is resized, so that it always fits the container.
  window.addEventListener('resize', () => {
    chart.applyOptions({
      width: $('#candlestick-chart').width(),
      height: $('#candlestick-chart').height(),
    });
  })

  var bubbleChart = new CanvasJS.Chart("bubble-chart",
    {
      title: {
        text: "Comparison among Countries on Fertility Rate Vs Life Expectancy in 2009"
      },
      data: [
        {
          type: "bubble",
          dataPoints: [
            // { x: 64.8, y: 2.66, z:12074.4 , name: "India"},
            //  { x: 73.1, y: 1.61, z:13313.8, name: "China"},
            { x: 78.1, y: 2.00, z: 306.77, name: "US" },
            { x: 68.5, y: 2.15, z: 237.414, name: "Indonesia" },
            { x: 72.5, y: 1.86, z: 193.24, name: "Brazil" },
            { x: 76.5, y: 2.36, z: 112.24, name: "Mexico" },
            { x: 50.9, y: 5.56, z: 154.48, name: "Nigeria" },
            { x: 68.6, y: 1.54, z: 141.91, name: "Russia" },

            { x: 82.9, y: 1.37, z: 127.55, name: "Japan" },
            { x: 79.8, y: 1.36, z: 81.90, name: "Australia" },
            { x: 72.7, y: 2.78, z: 79.71, name: "Egypt" },
            { x: 80.1, y: 1.94, z: 61.81, name: "UK" },
            { x: 55.8, y: 4.76, z: 39.24, name: "Kenya" },
            { x: 81.5, y: 1.93, z: 21.95, name: "Australia" },
            { x: 68.1, y: 4.77, z: 31.09, name: "Iraq" },
            { x: 47.9, y: 6.42, z: 33.42, name: "Afganistan" },
            { x: 50.3, y: 5.58, z: 18.55, name: "Angola" }
          ]
        }
      ]
    });

  bubbleChart.render();
}

window.addEventListener('load', chartCreation());


// CHANGE CANDLESTICK CHART

function changeCandleStickChart(companyName) {
  console.log('Changing Chart!');

  // Showing Creating Chart loader
  let candlestickChart = document.getElementById('candlestick-chart');
  let creatingCandlestickChart = document.getElementById('creating-candlestick-chart');
  candlestickChart.style.display = 'none';
  creatingCandlestickChart.style.display = 'block';

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/fetchChartData?companyName=' + companyName;
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      candlestickChartData = JSON.parse(xmlHttp.responseText);

      // Showing Candlestick Chart
      candlestickChart.style.display = 'block';
      creatingCandlestickChart.style.display = 'none';

      candleSeries.setData(candlestickChartData);
      console.log('Done');
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
}


// Checklist addition
let numChecklists = 0;

const addChecklistButton = document.getElementById('add-checklist');
addChecklistButton.addEventListener('click', () => {
  if (numChecklists < 5) {
    numChecklists++;
    let checklistItem = document.getElementById('checklist-item-' + numChecklists)
    let checklistInput = document.getElementById('checklist-input-' + numChecklists);
    let checklistP = document.getElementById('checklist-p-' + numChecklists);
    let hoverableButtons = document.getElementById('hoverable-buttons-' + numChecklists);

    checklistItem.addEventListener('mouseenter', () => {
      hoverableButtons.style.visibility = 'visible';
    })

    checklistItem.addEventListener('mouseleave', () => {
      hoverableButtons.style.visibility = 'hidden';
    })

    checklistItem.style.display = 'flex';
    checklistInput.focus();

    checklistInput.addEventListener('change', (event) => {
      checklistP.innerText = event.target.value;
    });

    checklistInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        checklistInput.style.display = 'none';
        checklistP.style.display = 'initial';
      }
    })

    if (numChecklists === 5) {
      addChecklistButton.classList.add('disabled');
    }
  }
})

// Adding edit and remove checklist handlers
for (let i = 1; i < 6; i++) {
  let checklistInput = document.getElementById('checklist-input-' + i);
  let checklistP = document.getElementById('checklist-p-' + i);
  let editChecklist = document.getElementById('edit-checklist-' + i);
  let removeChecklist = document.getElementById('remove-checklist-' + i);

  editChecklist.addEventListener('click', () => {
    checklistP.style.display = 'none';
    checklistInput.style.display = 'initial';
    checklistInput.focus();
  })

  removeChecklist.addEventListener('click', () => {
    for (let j = i + 1; j < numChecklists + 1; j++) {
      let k = j - 1;
      let upperChecklistP = document.getElementById('checklist-p-' + k);
      let lowerChecklistP = document.getElementById('checklist-p-' + j);
      let upperChecklistInput = document.getElementById('checklist-input-' + k);
      let lowerChecklistInput = document.getElementById('checklist-input-' + j);
      let upperCheckbox = document.getElementById('checkbox' + k);
      let lowerCheckbox = document.getElementById('checkbox' + j);

      upperChecklistP.innerText = lowerChecklistP.innerText;
      upperChecklistInput.value = lowerChecklistInput.value;
      upperCheckbox.checked = lowerCheckbox.checked;
    }

    let lastChecklistItem = document.getElementById('checklist-item-' + numChecklists);
    let lastChecklistP = document.getElementById('checklist-p-' + numChecklists);
    let lastChecklistInput = document.getElementById('checklist-input-' + numChecklists);
    let lastCheckbox = document.getElementById('checkbox' + numChecklists);

    lastChecklistP.innerText = '';
    lastChecklistInput.value = '';
    lastChecklistP.style.display = 'none';
    lastChecklistInput.style.display = 'initial';
    lastChecklistItem.style.display = 'none';
    lastCheckbox.checked = false;

    numChecklists--;
    addChecklistButton.classList.remove('disabled');
  })
}

// Reset Checklist

let resetChecklistButton = document.getElementById('reset-checklist');

resetChecklistButton.addEventListener('click', () => {
  for (let i = 1; i <= numChecklists; i++) {
    let checkbox = document.getElementById('checkbox' + i);
    checkbox.checked = false;
  }
})


// MONITOR-CREATE-EVENT

// Monitor-create-event-toggler

let monitorEventButton = document.getElementById('monitor-event-button');
let createEventButton = document.getElementById('create-event-button');
let monitorEvent = document.getElementById('monitor-event');
let createEvent = document.getElementById('create-event');

monitorEventButton.addEventListener('click', function (event) {
  monitorEvent.style.display = 'initial';
  createEvent.style.display = 'none';
})

createEventButton.addEventListener('click', function () {
  monitorEvent.style.display = 'none';
  createEvent.style.display = 'initial';
})

// MONITOR SCREEN

// Defined the initial number of screens for each event.
let numScreens = {
  'ORB': 3,
  'Breakout-RSI': 2,
  'Pivot-Touch': 1,
  'Event-1': 1,
  'Event-2': 1
}

// Currently selected event, 'ORB' by default
let selectedEvent = 'ORB';

// This function created and returns a new li element (for a given eventName and a screen number)
// used for making screen tab in the navbar of the monitor card.
function createNewScreenTab(eventName, num) {
  let li = document.createElement('li');
  li.setAttribute('class', 'nav-item');
  li.setAttribute('role', 'presentation');
  li.setAttribute('id', eventName + '-screen' + num + '-tab');

  let a = document.createElement('a');
  a.setAttribute('class', 'nav-link');
  a.setAttribute('data-toggle', 'tab');
  a.setAttribute('href', '#' + eventName + '-screen' + num);
  a.setAttribute('role', 'tab');
  a.setAttribute('aria-controls', eventName + '-screen' + num);
  a.setAttribute('aria-selected', 'false');
  a.innerText = 'Screen ' + num;

  let btn = document.createElement('button');
  btn.innerHTML = '<i class="fas fa-times"></i>';
  btn.setAttribute('onclick', 'deleteScreen(' + num + ')');

  a.append(btn);
  li.append(a);
  return (li);
}

// This function creates and returns a new screen div, for a given event name and screen number.
function createNewScreenDiv(eventName, num) {
  let screenDiv = document.createElement('div');
  let screenTitle = document.createElement('div');
  let companyTabs = document.createElement('div');
  let companyTabHeading = document.createElement('div');
  let symbolSpan = document.createElement('span');
  let chngPercentSpan = document.createElement('span');

  screenDiv.setAttribute('class', "tab-pane screen fade");
  screenDiv.setAttribute('id', eventName + '-screen' + num);
  screenDiv.setAttribute('role', 'tabpanel');
  screenDiv.setAttribute('aria-labelledby', eventName + '-screen' + num + '-tab');
  screenTitle.setAttribute('class', 'screen-title');
  screenTitle.setAttribute('id', eventName + '-screen' + num + '-title');
  companyTabs.setAttribute('class', 'company-tabs');
  companyTabs.setAttribute('id', eventName + '-screen' + num + '-company-tabs');
  companyTabHeading.setAttribute('class', 'company-tab-heading');
  symbolSpan.setAttribute('class', 'symbol');
  chngPercentSpan.setAttribute('class', 'chng-percent');

  symbolSpan.innerText = 'Symbol';
  chngPercentSpan.innerText = 'Chng%';
  screenTitle.innerText = 'Screen ' + num;
  screenDiv.append(screenTitle);
  companyTabHeading.append(symbolSpan);
  companyTabHeading.append(chngPercentSpan);
  companyTabs.append(companyTabHeading);
  screenDiv.append(companyTabs);

  return (screenDiv);
}

// When adding a screen, first the numscreens[selectedEvent] is increased by one.
// Then a screentab is created using the function and appended and same for the screendiv.
function addScreen() {
  numScreens[selectedEvent]++;

  let li = createNewScreenTab(selectedEvent, numScreens[selectedEvent]);
  let addScreenButton = document.getElementById(selectedEvent + '-add-screen-button');
  let screenTab = document.getElementById(selectedEvent + '-screenTab');
  screenTab.insertBefore(li, addScreenButton);

  let screenDiv = createNewScreenDiv(selectedEvent, numScreens[selectedEvent]);
  document.getElementById(selectedEvent + '-myTabContent').append(screenDiv);
  li.childNodes[0].click();
}

// This function deletes (hides) the screen with the given screen number, for the selectedEvent.
function deleteScreen(num) {
  let screenTab = document.getElementById(selectedEvent + '-screen' + num + '-tab');
  let screenDiv = document.getElementById(selectedEvent + '-screen' + num);
  screenTab.style.display = 'none';
  screenDiv.style.display = 'none';
}

// Create new event monitor div
function createNewEventMonitorDiv(eventName) {
  let eventDiv = document.createElement('div');
  eventDiv.setAttribute('id', eventName + '-div');

  // Creating the UL element.
  let ul = document.createElement('ul');
  ul.setAttribute('class', 'nav nav-tabs screen-nav-tabs custom-scrollbar');
  ul.setAttribute('id', eventName + '-screenTab');
  ul.setAttribute('role', 'tablist');

  // For loop for creating the required number of screenTabs
  for (let i = 1; i <= numScreens[eventName]; i++) {
    let li = createNewScreenTab(eventName, i);
    ul.append(li);

    // As the createElement and other  functions are async, to keep them in sync,
    // I've added them in this if statement so that this code runs only when the last loop is completed.
    if (i === numScreens[eventName]) {
      let addScreenButton = document.createElement('button');
      addScreenButton.setAttribute('id', eventName + '-add-screen-button');
      addScreenButton.setAttribute('class', 'add-screen-button');
      addScreenButton.setAttribute('onclick', 'addScreen()');
      addScreenButton.innerHTML = '<i class="fas fa-plus"></i>';
      ul.append(addScreenButton);
      eventDiv.append(ul);

      let screensDiv = document.createElement('div');
      screensDiv.setAttribute('class', 'tab-content');
      screensDiv.setAttribute('id', eventName + '-myTabContent');

      // For loop for creating screendiv
      for (let j = 1; j <= numScreens[eventName]; j++) {
        let screenDiv = createNewScreenDiv(eventName, j);
        screensDiv.append(screenDiv);

        // Same reason for creating this if statement.
        // This code executes only after the last loop is completed.
        if (j === numScreens[eventName]) {
          eventDiv.append(screensDiv);
          return (eventDiv);
        }
      }
    }
  }
}

// Chaging the event
function changeCurrentEvent(newEventName) {
  // If we are changing/deleting event from the show-all-events-modal, then this will close that modal.
  // If we are doing so from the bottom section of the monitor screen, then no effect.
  document.getElementById('close-show-all-events-modal').click();

  document.getElementById(selectedEvent + '-div').style.display = 'none';
  selectedEvent = newEventName

  let bubbles = document.getElementsByClassName('monitor-bubble');
  // This for loop is asyncronous, but who cares, doesnt affect the aage wala code.
  // First removes active class from all the bubbles and then adds it to the desired class.
  for (let k = 0; k < bubbles.length; k++) {
    bubbles[k].classList.remove('active');
    if (bubbles[k].id == selectedEvent + '-monitor-bubble') {
      bubbles[k].classList.add('active');
    }
  }

  let modalBubbles = document.getElementsByClassName('modal-bubble');
  // This for loop is asyncronous, but who cares, doesnt affect the aage wala code.
  // First removes active class from all the bubbles and then adds it to the desired class.
  for (let l = 0; l < modalBubbles.length; l++) {
    modalBubbles[l].classList.remove('active');
    if (modalBubbles[l].id == selectedEvent + '-modal-bubble') {
      modalBubbles[l].classList.add('active');
    }
  }

  let eventDiv = document.getElementById(selectedEvent + '-div');
  // If element has already been created, then simply display it, else create the element.
  if (eventDiv) {
    eventDiv.style.display = 'initial';
  } else {
    eventDiv = createNewEventMonitorDiv(selectedEvent);
    document.getElementById('outer-screen-div').append(eventDiv);
    eventDiv.childNodes[0].childNodes[0].childNodes[0].click();
  }
}

// Deletes(hides) an event completely.
function deleteMonitorEvent(eventName) {
  document.getElementById('close-modal').click();
  let monitorBubble = document.getElementById(eventName + '-monitor-bubble');
  if (monitorBubble) {
    monitorBubble.style.display = 'none';
  }
  document.getElementById(eventName + '-modal-bubble').style.display = 'none';
  let eventDiv = document.getElementById(eventName + '-div');
  if (eventDiv) {
    eventDiv.style.display = 'none';
  }
}

// Code for dynamic modal on confirming event deletion
// Check bootstrap-modals docs for more info
$('#delete-monitor-bubble-modal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var recipient = button.data('bubblename')
  var modal = $(this)
  modal.find('.modal-body').text('This will delete the ' + recipient + ' event permanantly. Are you sure?')
  modal.find('#confirm-delete-button').attr('onclick', "deleteMonitorEvent('" + recipient + "')");
})


// CREATE EVENT

let numCustomEvents = 1;

// Price-action / Indicator / Price div toggle

let priceActionButton = document.getElementById('price-action-button');
let indicatorButton = document.getElementById('indicator-button');
let priceButton = document.getElementById('price-button');
let priceActionDiv = document.getElementById('price-action-div');
let indicatorDiv = document.getElementById('indicator-div');
let priceDiv = document.getElementById('price-div');

priceActionButton.addEventListener('click', function () {
  priceActionDiv.style.display = 'block';
  indicatorDiv.style.display = 'none';
  priceDiv.style.display = 'none';
})

indicatorButton.addEventListener('click', function () {
  priceActionDiv.style.display = 'none';
  indicatorDiv.style.display = 'block';
  priceDiv.style.display = 'none';
})

priceButton.addEventListener('click', function () {
  priceActionDiv.style.display = 'none';
  indicatorDiv.style.display = 'none';
  priceDiv.style.display = 'block';
})


// Displaying different Price Action tools
let priceActionToolsDropdown = document.getElementById('price-action-tools-dropdown');
let priceActionToolsDiv = document.getElementsByClassName('price-action-tools-div');

priceActionToolsDropdown.addEventListener('change', function () {
  for (let i = 0; i < priceActionToolsDiv.length; i++) {
    priceActionToolsDiv[i].style.display = 'none';
    if (priceActionToolsDiv[i].id == (priceActionToolsDropdown.value + '-div')) {
      priceActionToolsDiv[i].style.display = 'block';
    }
  }
})


// Displaying different Indicator tools
let indicatorToolsDropdown = document.getElementById('indicator-tools-dropdown');
let indicatorToolsDiv = document.getElementsByClassName('indicator-tools-div');

indicatorToolsDropdown.addEventListener('change', function () {
  for (let i = 0; i < indicatorToolsDiv.length; i++) {
    indicatorToolsDiv[i].style.display = 'none';
    if (indicatorToolsDiv[i].id == (indicatorToolsDropdown.value + '-div')) {
      indicatorToolsDiv[i].style.display = 'block';
    }
  }
})


// Displaying different Tools choices
// ADX and BBANDS ARE A BIT DIFFERENT, SO ITS CHOICE DISPLAY IS JUST ABOVE ITS BACKEND CALL.
let toolsChoicesDropdown = document.getElementsByClassName('tools-choices-dropdown');

for (let i = 0; i < toolsChoicesDropdown.length; i++) {
  // name will contain the tool name such as 'ema'
  let toolName = toolsChoicesDropdown[i].id.toString().split('-')[0];
  let toolChoicesDropdown = document.getElementById(toolName + '-choices-dropdown');
  let toolChoicesDiv = document.getElementsByClassName(toolName + '-choices-div');

  // Hiding all not-selected-divs and displaying the selected div, on window load
  for (let j = 0; j < toolChoicesDiv.length; j++) {
    toolChoicesDiv[j].style.display = 'none';

    if (toolChoicesDiv[j].id == (toolChoicesDropdown.value + '-div')) {
      toolChoicesDiv[j].style.display = 'block';
    }
  }

  // Changing the choices of each tool
  toolChoicesDropdown.addEventListener('change', function () {
    for (let j = 0; j < toolChoicesDiv.length; j++) {
      toolChoicesDiv[j].style.display = 'none';

      if (toolChoicesDiv[j].id == (toolChoicesDropdown.value + '-div')) {
        toolChoicesDiv[j].style.display = 'block';
      }
    }
  })

}


// Initialising an event
// This function will create the eventName, add it into the numScreens Variable with the given number of screens and return the eventName
function newEventInitialiser(num) {
  let eventName = document.getElementById('event-name').value.toString().split(' ').join('-');
  if (eventName == '') {
    eventName = 'Custom-Event-' + numCustomEvents;
    numCustomEvents++;
  }
  numScreens[eventName] = num;
  return eventName;
}


// Creating a bubble for the givent eventName in the modal
function createNewBubbleForModal(eventName) {
  let a = document.createElement('a');
  let button = document.createElement('button');
  let icon = document.createElement('i');

  a.setAttribute('class', 'modal-bubble');
  a.setAttribute('id', eventName + '-modal-bubble');
  a.setAttribute('onClick', 'changeCurrentEvent(\'' + eventName + '\')');
  a.innerText = eventName.split('-').join(' ');
  button.setAttribute('type', 'button');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#delete-monitor-bubble-modal');
  button.setAttribute('data-bubblename', eventName);
  icon.setAttribute('class', 'fa fa-times');

  button.append(icon);
  a.append(button);
  return a;
}


// Adding fetchedData into their respective screens tab
function addFetchedData(eventName, fetchedData) {
  let screenNum = 1;
  for (let screen in fetchedData) {
    let screenCompanyTabs = document.getElementById(eventName + '-screen' + screenNum + '-company-tabs');
    for (let i = 0; i < fetchedData[screen].length; i++) {
      let div = document.createElement('div');
      let span = document.createElement('span');

      div.setAttribute('class', 'company-tab');
      div.setAttribute('onclick', 'changeCandleStickChart(\'' + fetchedData[screen][i].toString() + '\')')
      span.setAttribute('class', 'symbol');
      span.innerText = fetchedData[screen][i].toString().substr(0, fetchedData[screen][i].toString().length - 3);
      div.append(span);
      screenCompanyTabs.append(div);

      if (i == fetchedData[screen].length - 1) screenNum++;
    }
  }
}


// Creating Events
let creatingEventLoader = document.getElementById('creating-event-loader');


function createMovingAverage(type) {
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let MAChoicesDropdown = document.getElementById(type + '-choices-dropdown');
  let MALength = document.getElementById(type + '-length');
  let MALen1 = document.getElementById(type + '-len1');
  let MALen2 = document.getElementById(type + '-len2');
  let MACross = document.getElementById(type + '-cross');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/MovingAverage?';
  url += ('type=' + type);
  url += ('&choice=' + (MAChoicesDropdown.value === (type + '-crossovers') ? 2 : 1));
  url += ('&cross=' + (MACross.checked ? 1 : 0));
  url += ('&length=' + MALength.value.toString());
  url += ('&len1=' + MALen1.value.toString());
  url += ('&len2=' + MALen2.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = type.toUpperCase() + ' Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = type.toUpperCase() + ' Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
}

// Creating Moving Average Events
document.getElementById('create-ema-event').addEventListener('click', () => createMovingAverage('ema'))
document.getElementById('create-dema-event').addEventListener('click', () => createMovingAverage('dema'))
document.getElementById('create-hma-event').addEventListener('click', () => createMovingAverage('hma'))
document.getElementById('create-kama-event').addEventListener('click', () => createMovingAverage('kama'))
document.getElementById('create-sma-event').addEventListener('click', () => createMovingAverage('sma'))
document.getElementById('create-rma-event').addEventListener('click', () => createMovingAverage('rma'))
document.getElementById('create-sinwma-event').addEventListener('click', () => createMovingAverage('sinwma'))
document.getElementById('create-swma-event').addEventListener('click', () => createMovingAverage('swma'))
document.getElementById('create-t3ma-event').addEventListener('click', () => createMovingAverage('t3ma'))
document.getElementById('create-tema-event').addEventListener('click', () => createMovingAverage('tema'))
document.getElementById('create-trima-event').addEventListener('click', () => createMovingAverage('trima'))
document.getElementById('create-vwma-event').addEventListener('click', () => createMovingAverage('vwma'))
document.getElementById('create-zlma-event').addEventListener('click', () => createMovingAverage('zlma'))


// Creating an VWAP Event
let createVWAPEvent = document.getElementById('create-vwap-event');
createVWAPEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let VWAPCross = document.getElementById('vwap-cross');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/vwap?';
  url += ('&cross=' + (VWAPCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'VWAP Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'VWAP Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a SUPERTREND Event
let createSupertrendEvent = document.getElementById('create-supertrend-event');
createSupertrendEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let SupertrendCross = document.getElementById('supertrend-cross');
  let SupertrendLength = document.getElementById('supertrend-length');
  let SupertrendMultiplier = document.getElementById('supertrend-multiplier');
  let SupertrendOffset = document.getElementById('supertrend-offset');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/supertrend?';
  url += ('&cross=' + (SupertrendCross.checked ? 1 : 0));
  url += ('&length=' + SupertrendLength.value.toString());
  url += ('&multiplier=' + SupertrendMultiplier.value.toString());
  url += ('&offset=' + SupertrendOffset.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Supertrend Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Supertrend Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})

// Creating a ICHIMOKU Event
let createIchimokuEvent = document.getElementById('create-ichimoku-event');
createIchimokuEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let IchimokuCross = document.getElementById('ichimoku-cross');
  let IchimokuChoicesDropdown = document.getElementById('ichimoku-choices-dropdown');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/ichimoku?';
  url += ('&cross=' + (IchimokuCross.checked ? 1 : 0));
  url += ('&choice=' + IchimokuChoicesDropdown.value.toString().substr(IchimokuChoicesDropdown.value.toString().length - 1));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Ichimoku Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Ichimoku Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a VORTEX Event
let createVortexEvent = document.getElementById('create-vortex-event');
createVortexEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let VortexCross = document.getElementById('vortex-cross');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/vortex?';
  url += ('&cross=' + (VortexCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Vortex Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Vortex Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a PSAR Event
let createPSAREvent = document.getElementById('create-psar-event');
createPSAREvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let PSARLast = document.getElementById('psar-last');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/psar?';
  url += ('&last=' + PSARLast.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'PSAR Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'PSAR Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a CKSP Event
let createCKSPEvent = document.getElementById('create-cksp-event');
createCKSPEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/cksp';
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'CKSP Touching Lower';
      document.getElementById(eventName + '-screen2-title').innerText = 'CKSP Touching Upper';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a CHOP Event
let createCHOPEvent = document.getElementById('create-chop-event');
createCHOPEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let CHOPChoicesDropdown = document.getElementById('chop-choices-dropdown');
  let choice = CHOPChoicesDropdown.value.toString().substr(CHOPChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(2);
  else eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let CHOPUpper = document.getElementById('chop-upper');
  let CHOPLower = document.getElementById('chop-lower');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/chop?';
  url += ('&choice=' + choice);
  url += ('&upper=' + CHOPUpper.value.toString());
  url += ('&lower=' + CHOPLower.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'CHOP Oversold';
        document.getElementById(eventName + '-screen2-title').innerText = 'CHOP Overbought';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'CHOP Trending';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a AROON Event
let createAroonEvent = document.getElementById('create-aroon-event');
createAroonEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let AroonCross = document.getElementById('aroon-cross');
  let AroonUpperThreshold = document.getElementById('aroon-upper-threshold');
  let AroonLowerThreshold = document.getElementById('aroon-lower-threshold');
  let AroonChoicesDropdown = document.getElementById('aroon-choices-dropdown');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/aroon?';
  url += ('cross=' + (AroonCross.checked ? 1 : 0))
  url += ('&choice=' + AroonChoicesDropdown.value.toString().substr(AroonChoicesDropdown.value.toString().length - 1));
  url += ('&upperThreshold=' + AroonUpperThreshold.value.toString());
  url += ('&lowerThreshold=' + AroonLowerThreshold.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Aroon Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Aroon Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// ADX CHOICES DISPLAY
let ADXChoicesDropdown = document.getElementById('adx-choices-dropdown');
let ADXThresholdADXDiv = document.getElementById('adx-threshold-adx-div');
let ADXBufferDiv = document.getElementById('adx-buffer-div');
let ADXCrossDiv = document.getElementById('adx-cross-div');

// Initial
ADXBufferDiv.style.display = 'none';
ADXCrossDiv.style.display = 'none';

ADXChoicesDropdown.addEventListener('change', function () {
  if (ADXChoicesDropdown.value == 'adx-choice-1') {
    ADXThresholdADXDiv.style.display = 'block';
    ADXBufferDiv.style.display = 'none';
    ADXCrossDiv.style.display = 'none';
  } else if (ADXChoicesDropdown.value == 'adx-choice-2') {
    ADXThresholdADXDiv.style.display = 'none';
    ADXBufferDiv.style.display = 'none';
    ADXCrossDiv.style.display = 'block';
  } else if (ADXChoicesDropdown.value == 'adx-choice-3') {
    ADXThresholdADXDiv.style.display = 'block';
    ADXBufferDiv.style.display = 'none';
    ADXCrossDiv.style.display = 'block';
  } else {
    ADXThresholdADXDiv.style.display = 'block';
    ADXBufferDiv.style.display = 'block';
    ADXCrossDiv.style.display = 'none';
  }
})

// Creating a ADX Event
let createADXEvent = document.getElementById('create-adx-event');
createADXEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let ADXChoicesDropdown = document.getElementById('adx-choices-dropdown');
  let choice = ADXChoicesDropdown.value.toString().substr(ADXChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(1);
  else if (choice == '2' || choice == '3') eventName = newEventInitialiser(2);
  else eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let ADXCross = document.getElementById('adx-cross');
  let ADXThresholdADX = document.getElementById('adx-threshold-adx');
  let ADXBuffer = document.getElementById('adx-buffer');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/adx?';
  url += ('&choice=' + choice);
  url += ('&thresholdADX=' + ADXThresholdADX.value.toString());
  url += ('&buffer=' + ADXBuffer.value.toString());
  url += ('&cross=' + (ADXCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'Above Threshold';
      } else if (choice == '2' || choice == '3') {
        document.getElementById(eventName + '-screen1-title').innerText = 'ADX Bullish';
        document.getElementById(eventName + '-screen2-title').innerText = 'ADX Bearish';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'Around Threshold';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating an KC Event
let createKCEvent = document.getElementById('create-kc-event');
createKCEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let KCChoicesDropdown = document.getElementById('kc-choices-dropdown');
  let choice = KCChoicesDropdown.value.toString().substr(KCChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(2);
  else eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let KCCross = document.getElementById('kc-cross');
  let KCLength = document.getElementById('kc-length');
  let KCScalar = document.getElementById('kc-scalar');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/kc?';
  url += ('&choice=' + choice);
  url += ('&length=' + KCLength.value.toString());
  url += ('&scalar=' + KCScalar.value.toString());
  url += ('&cross=' + (KCCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'KC Bullish';
        document.getElementById(eventName + '-screen2-title').innerText = 'KC Bearish';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'Touching Band';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a ACCBANDS Event
let createAccBandsEvent = document.getElementById('create-accbands-event');
createAccBandsEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let AccBandsChoicesDropdown = document.getElementById('accbands-choices-dropdown');
  let choice = AccBandsChoicesDropdown.value.toString().substr(AccBandsChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(2);
  else eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let AccBandsCross = document.getElementById('accbands-cross');
  let AccBandsLength = document.getElementById('accbands-length');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/accbands?';
  url += ('&choice=' + choice);
  url += ('&length=' + AccBandsLength.value.toString());
  url += ('&cross=' + (AccBandsCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'Acc Bands Bullish';
        document.getElementById(eventName + '-screen2-title').innerText = 'Acc Bands Bearish';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'Touching Band';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a DONCHIAN Event
let createDonchianEvent = document.getElementById('create-donchian-event');
createDonchianEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let DonchianChoicesDropdown = document.getElementById('donchian-choices-dropdown');
  let choice = DonchianChoicesDropdown.value.toString().substr(DonchianChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(2);
  else eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let DonchianCross = document.getElementById('donchian-cross');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/donchian?';
  url += ('&choice=' + choice);
  url += ('&cross=' + (DonchianCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'Donchian Bullish';
        document.getElementById(eventName + '-screen2-title').innerText = 'Donchian Bearish';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'Touching Band';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// BBands CHOICES DISPLAY
let BBandsChoicesDropdown = document.getElementById('bbands-choices-dropdown');
let BBandsThresholdDiv = document.getElementById('bbands-threshold-div');
let BBandsExpansionDiv = document.getElementById('bbands-expansion-div');
let BBandsCrossDiv = document.getElementById('bbands-cross-div');

// Initial
BBandsExpansionDiv.style.display = 'none';
BBandsThresholdDiv.style.display = 'none'

BBandsChoicesDropdown.addEventListener('change', function () {
  if (BBandsChoicesDropdown.value == 'bbands-choice-1') {
    BBandsThresholdDiv.style.display = 'none';
    BBandsExpansionDiv.style.display = 'none';
    BBandsCrossDiv.style.display = 'block';
  } else if (BBandsChoicesDropdown.value == 'bbands-choice-2' || BBandsChoicesDropdown.value == 'bbands-choice-3') {
    BBandsThresholdDiv.style.display = 'none';
    BBandsExpansionDiv.style.display = 'none';
    BBandsCrossDiv.style.display = 'none';
  } else if (BBandsChoicesDropdown.value == 'bbands-choice-4') {
    BBandsThresholdDiv.style.display = 'block';
    BBandsExpansionDiv.style.display = 'none';
    BBandsCrossDiv.style.display = 'none';
  } else {
    BBandsThresholdDiv.style.display = 'block';
    BBandsExpansionDiv.style.display = 'block';
    BBandsCrossDiv.style.display = 'none';
  }
})

// Creating a BBands Event
let createBBandsEvent = document.getElementById('create-bbands-event');
createBBandsEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let BBandsChoicesDropdown = document.getElementById('bbands-choices-dropdown');
  let choice = BBandsChoicesDropdown.value.toString().substr(BBandsChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(2);
  else eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let BBandsCross = document.getElementById('bbands-cross');
  let BBandsLength = document.getElementById('bbands-length');
  let BBandsThreshold = document.getElementById('bbands-threshold');
  let BBandsExpansion = document.getElementById('bbands-expansion');
  let BBandsStd = document.getElementById('bbands-std');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/bbands?';
  url += ('&choice=' + choice);
  url += ('&cross=' + (BBandsCross.checked ? 1 : 0));
  url += ('&length=' + BBandsLength.value.toString());
  url += ('&threshold=' + BBandsThreshold.value.toString());
  url += ('&expansion=' + BBandsExpansion.value.toString());
  url += ('&std=' + BBandsStd.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'BBands Bullish';
        document.getElementById(eventName + '-screen2-title').innerText = 'BBands Bearish';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'Condition True';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a OBV Event
let createOBVEvent = document.getElementById('create-obv-event');
createOBVEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(3);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let OBVWindow = document.getElementById('obv-window');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/obv?';
  url += ('&window=' + OBVWindow.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'OBV Increasing';
      document.getElementById(eventName + '-screen2-title').innerText = 'OBV in a Range';
      document.getElementById(eventName + '-screen3-title').innerText = 'OBV Decreasing';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a CMF Event
let createCMFEvent = document.getElementById('create-cmf-event');
createCMFEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  // let OBVWindow = document.getElementById('obv-window');
  let CMFChoicesDropdown = document.getElementById('cmf-choices-dropdown');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/cmf?';
  url += ('choice=' + CMFChoicesDropdown.value.toString().substr(CMFChoicesDropdown.value.toString().length - 1));
  // url += ('&window=' + OBVWindow.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'CMF Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'CMF Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a MFI Event
let createMFIEvent = document.getElementById('create-mfi-event');
createMFIEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let MFICross = document.getElementById('mfi-cross');
  let MFIUpperThreshold = document.getElementById('mfi-upper-threshold');
  let MFILowerThreshold = document.getElementById('mfi-lower-threshold');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/mfi?';
  url += ('upperThreshold=' + MFIUpperThreshold.value.toString());
  url += ('&lowerThreshold=' + MFILowerThreshold.value.toString());
  url += ('&cross=' + (MFICross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'MFI Oversold';
      document.getElementById(eventName + '-screen2-title').innerText = 'MFI Overbought';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a AO Event
let createAOEvent = document.getElementById('create-ao-event');
createAOEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let AOChoicesDropdown = document.getElementById('ao-choices-dropdown');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/ao?';
  url += ('choice=' + AOChoicesDropdown.value.toString().substr(AOChoicesDropdown.value.toString().length - 1));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'AO Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'AO Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a STOCH Event
let createStochEvent = document.getElementById('create-stoch-event');
createStochEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let StochChoicesDropdown = document.getElementById('stoch-choices-dropdown');
  let StochUpperThreshold = document.getElementById('stoch-upper-threshold');
  let StochLowerThreshold = document.getElementById('stoch-lower-threshold');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/stoch?';
  url += ('choice=' + StochChoicesDropdown.value.toString().substr(StochChoicesDropdown.value.toString().length - 1));
  url += ('&upperThreshold=' + StochUpperThreshold.value.toString());
  url += ('&lowerThreshold=' + StochLowerThreshold.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Stochastic Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Stochastic Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a STOCHRSI Event
let createStochRSIEvent = document.getElementById('create-stochrsi-event');
createStochRSIEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let StochRSIChoicesDropdown = document.getElementById('stochrsi-choices-dropdown');
  let StochRSIUpperThreshold = document.getElementById('stochrsi-upper-threshold');
  let StochRSILowerThreshold = document.getElementById('stochrsi-lower-threshold');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/stochrsi?';
  url += ('choice=' + StochRSIChoicesDropdown.value.toString().substr(StochRSIChoicesDropdown.value.toString().length - 1));
  url += ('&upperThreshold=' + StochRSIUpperThreshold.value.toString());
  url += ('&lowerThreshold=' + StochRSILowerThreshold.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Stochastic Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Stochastic Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a CCI Event
let createCCIEvent = document.getElementById('create-cci-event');
createCCIEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let CCIChoicesDropdown = document.getElementById('cci-choices-dropdown');
  let CCIUpperThreshold = document.getElementById('cci-upper-threshold');
  let CCILowerThreshold = document.getElementById('cci-lower-threshold');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/cci?';
  url += ('choice=' + CCIChoicesDropdown.value.toString().substr(CCIChoicesDropdown.value.toString().length - 1));
  url += ('&upperThreshold=' + CCIUpperThreshold.value.toString());
  url += ('&lowerThreshold=' + CCILowerThreshold.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'CCI Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'CCI Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a ROC Event
let createROCEvent = document.getElementById('create-roc-event');
createROCEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/roc';
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'ROC Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'ROC Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a MACD Event
let createMACDEvent = document.getElementById('create-macd-event');
createMACDEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let MACDCross = document.getElementById('macd-cross');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/macd?';
  url += ('cross=' + (MACDCross.checked ? 1 : 0));
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'MACD Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'MACD Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a RSI Event
let createRSIEvent = document.getElementById('create-rsi-event');
createRSIEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let RSICross = document.getElementById('rsi-cross');
  let RSIChoicesDropdown = document.getElementById('rsi-choices-dropdown');
  let RSIUpperThreshold = document.getElementById('rsi-upper-threshold');
  let RSILowerThreshold = document.getElementById('rsi-lower-threshold');
  let choice = RSIChoicesDropdown.value.toString().substr(RSIChoicesDropdown.value.toString().length - 1);

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/rsi?';
  url += ('cross=' + (RSICross.checked ? 1 : 0));
  url += ('&choice=' + choice);
  url += ('&upperThreshold=' + RSIUpperThreshold.value.toString());
  url += ('&lowerThreshold=' + RSILowerThreshold.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'RSI Oversold';
        document.getElementById(eventName + '-screen2-title').innerText = 'RSI Overbought';
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'RSI Bullish';
        document.getElementById(eventName + '-screen2-title').innerText = 'RSI Bearish';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating an CPR Event
let createCPREvent = document.getElementById('create-cpr-event');
createCPREvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let CPRChoicesDropdown = document.getElementById('cpr-choices-dropdown');
  let choice = CPRChoicesDropdown.value.toString().substr(CPRChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(10);
  else eventName = newEventInitialiser(1);

  let screenNames = ['Candle Engulfing CPR', 'Touching Upper CPR', 'Touching Lower CPR', 'Candle Inside CPR', 'Candle Between Upper CPR and R1', 'Touching R1', 'Outside R1', 'Candle Between Lower CPR and S1', 'Touching S1', 'Outside S1'];

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let CPRScreenChoice = document.getElementById('cpr-choice2-select-points');
  let point = CPRScreenChoice.value.toString().substr(CPRScreenChoice.value.toString().length - 1);
  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/cpr?';
  url += ('choice=' + choice);
  url += ('&point=' + point);
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        for (let i = 0; i < 10; i++) {
          document.getElementById(eventName + '-screen' + (i + 1) + '-title').innerText = screenNames[i];
        }
      } else if (choice == '2') {
        document.getElementById(eventName + '-screen1-title').innerText = screenNames[point - 1];
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = 'CPR Squeeze';
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a PIVOTFIBO Event
let createPivotFiboEvent = document.getElementById('create-pivotfibo-event');
createPivotFiboEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let PivotFiboChoicesDropdown = document.getElementById('pivotfibo-choices-dropdown');
  let choice = PivotFiboChoicesDropdown.value.toString().substr(PivotFiboChoicesDropdown.value.toString().length - 1);
  let eventName;
  if (choice == '1') eventName = newEventInitialiser(7);
  else eventName = newEventInitialiser(1);

  let screenNames = ['Touching Pivot', 'Touching R1', 'Touching R2', 'Touching R3', 'Touching S1', 'Touching S2', 'Touching S3'];

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let pivotFiboScreenChoice = document.getElementById('pivotfibo-choice2-select-points');
  let point = pivotFiboScreenChoice.value.toString().substr(pivotFiboScreenChoice.value.toString().length - 1);
  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/pivotfibo?';
  url += ('choice=' + choice);
  url += ('&point=' + point);
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      if (choice == '1') {
        document.getElementById(eventName + '-screen1-title').innerText = 'Touching Pivot';
        for (let i = 2; i <= 7; i++) {
          document.getElementById(eventName + '-screen' + i + '-title').innerText = screenNames[i - 1];
        }
      } else {
        document.getElementById(eventName + '-screen1-title').innerText = screenNames[point - 1];
      }
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a ORB Event
let createORBEvent = document.getElementById('create-orb-event');
createORBEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(3);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let ORBTime = document.getElementById('orb-time');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/orb?';
  url += ('time=' + ORBTime.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'ORB Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'ORB Bearish';
      document.getElementById(eventName + '-screen3-title').innerText = 'ORB Range';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a STRUCTURE Event
let createStructureEvent = document.getElementById('create-structure-event');
createStructureEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(3);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let StructureWindow = document.getElementById('structure-window');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/structure?';
  url += ('window=' + StructureWindow.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Uptrend';
      document.getElementById(eventName + '-screen2-title').innerText = 'Range Bound';
      document.getElementById(eventName + '-screen3-title').innerText = 'Downtrend';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a PULLBACK Event
let createPullbackEvent = document.getElementById('create-pullback-event');
createPullbackEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let PullbackBigWindow = document.getElementById('pullback-big-window');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/pullback?';
  url += ('bigWindow=' + PullbackBigWindow.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Pullback';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a RANGEBOUND Event
let createRangeBoundEvent = document.getElementById('create-rangebound-event');
createRangeBoundEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let RangeBoundWindow = document.getElementById('rangebound-window');
  let RangeBoundPercentage = document.getElementById('rangebound-percentage');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/rangebound?';
  url += ('window=' + RangeBoundWindow.value.toString());
  url += ('&percentage=' + RangeBoundPercentage.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Range Bounded';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a BREAKOUT Event
let createBreakoutEvent = document.getElementById('create-breakout-event');
createBreakoutEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(2);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let BreakoutWindow = document.getElementById('breakout-window');
  let BreakoutPercentage = document.getElementById('breakout-percentage');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/breakout?';
  url += ('window=' + BreakoutWindow.value.toString());
  url += ('&percentage=' + BreakoutPercentage.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Breakout Bullish';
      document.getElementById(eventName + '-screen2-title').innerText = 'Breakout Bearish';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Creating a REVERSAL Event
let createReversalEvent = document.getElementById('create-reversal-event');
createReversalEvent.addEventListener('click', function () {
  console.log('clicked');
  // Showing the creating event spinner
  createEvent.style.display = 'none';
  creatingEventLoader.style.display = 'block';

  // Initialising the event
  let eventName = newEventInitialiser(1);

  // Creating a bubble in the show all events modal
  let modalBubblesContainer = document.getElementById('modal-bubbles-container');
  let a = createNewBubbleForModal(eventName);
  modalBubblesContainer.append(a);

  // Creating new Monitor Div
  let monitorDiv = createNewEventMonitorDiv(eventName);
  document.getElementById('outer-screen-div').append(monitorDiv);

  // Customizing the URL
  let reversalWindow = document.getElementById('reversal-window');
  let reversalExclude = document.getElementById('reversal-exclude');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/reversal?';
  url += ('window=' + reversalWindow.value.toString());
  url += ('&exclude=' + reversalExclude.value.toString());
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      creatingEventLoader.style.display = 'none';
      monitorEvent.style.display = 'block';

      let fetchedData = JSON.parse(xmlHttp.responseText);
      addFetchedData(eventName, fetchedData);

      console.log('Final click');
      // Opening the first Screen tab of the created monitor screens
      changeCurrentEvent(eventName);
      document.getElementById(eventName + '-screen1-tab').childNodes[0].click();
      document.getElementById(eventName + '-screen1-title').innerText = 'Reversal';
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o');
  xmlHttp.send(null);
})


// Things to do
// 1) Pass on personalized jwt token.
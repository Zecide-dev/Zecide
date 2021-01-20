let backendBaseURL = 'http://143.110.191.194/';

let jwtToken = localStorage.getItem('jwttoken');


// For future use
let candleSeries;
let candlestickChartData = [];
let selectedCompany = 'INFY.NS';


// CREATING COMPANY TAB DIV
function createCompanyTabDiv(companyName) {
  let div = document.createElement('div');
  let span = document.createElement('span');

  div.setAttribute('class', 'company-tab');
  div.setAttribute('onclick', 'changeCandleStickChart(\'' + companyName + '\')')
  span.setAttribute('class', 'symbol');
  span.innerText = companyName.substr(0, companyName.length - 3);
  div.append(span);
  return (div);
}


// ADDING COMPANY TABS INTO THE NIFTY SECTION
let nifty = ['INFY.NS', 'ITC.NS', 'UPL.NS', 'CIPLA.NS', 'ASIANPAINT.NS', 'DRREDDY.NS', 'WIPRO.NS', 'HCLTECH.NS', 'HINDALCO.NS', 'MARUTI.NS', 'POWERGRID.NS', 'DIVISLAB.NS', 'ICICIBANK.NS', 'TECHM.NS', 'ADANIPORTS.NS', 'TCS.NS', 'SBIN.NS', 'HDFC.NS', 'BAJFINANCE.NS', 'TATASTEEL.NS', 'ULTRACEMCO.NS', 'TITAN.NS', 'SUNPHARMA.NS', 'M&M.NS', 'RELIANCE.NS', 'HINDUNILVR.NS', 'BAJAJFINSV.NS', 'AXISBANK.NS', 'BRITANNIA.NS', 'NTPC.NS', 'LT.NS', 'KOTAKBANK.NS', 'GRASIM.NS', 'NESTLEIND.NS', 'SHREECEM.NS', 'IOC.NS', 'BPCL.NS', 'BAJAJ-AUTO.NS', 'HEROMOTOCO.NS', 'COALINDIA.NS', 'SBILIFE.NS', 'EICHERMOT.NS', 'HDFCBANK.NS', 'ONGC.NS', 'INDUSINDBK.NS', 'TATAMOTORS.NS', 'HDFCLIFE.NS', 'GAIL.NS', 'JSWSTEEL.NS', 'BHARTIARTL.NS']
function addCompaniesIntoNifty() {
  let niftyCompaniesDiv = document.getElementById('nifty-companies-div');
  nifty.forEach(company => {
    let returnedDiv = createCompanyTabDiv(company);
    niftyCompaniesDiv.append(returnedDiv);
  })
}


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


  // NEW BUBBLE CHART

  // FETCHIG BUBBLE CHART DATA

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/bubbleChartData';
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      bubbleChartData = JSON.parse(xmlHttp.responseText);

      // Showing bubbleChart

      var layout = {
        title: 'Sector Analytics',
        showlegend: true,
        height: 520,
        width: 850,
        xaxis: {
          title: "Latest Move Percentage",
          range: [ 0, 2 ]
        },
        yaxis: {
          title: "Returns",
          range: [ -1, 7 ]
        },
        plot_bgcolor: "#F3FAFf"
      };

      document.getElementById('creating-bubble-chart').style.display = 'none';
    
      Plotly.newPlot('bubble-chart', bubbleChartData, layout);
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous
  xmlHttp.send(null);
}


// CHANGE CANDLESTICK CHART

function changeCandleStickChart(companyName) {
  console.log('Changing Chart!');

  // Changing the selected Company
  selectedCompany = companyName;

  // Changing the Chart Title
  let candlestickChartTitle = document.getElementById('candlestick-chart-title');
  candlestickChartTitle.innerText = companyName;

  // Changing the company in the risk management section
  document.getElementById('risk-management-company-name').innerText = companyName;

  // Showing Creating Chart loader
  let candlestickChartDiv = document.getElementById('candlestick-chart-div');
  let creatingCandlestickChart = document.getElementById('creating-candlestick-chart');
  candlestickChartDiv.style.display = 'none';
  creatingCandlestickChart.style.display = 'block';

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/fetchChartData?companyName=' + companyName;
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      candlestickChartData = JSON.parse(xmlHttp.responseText);

      // Showing Candlestick Chart
      candlestickChartDiv.style.display = 'block';
      creatingCandlestickChart.style.display = 'none';

      candleSeries.setData(candlestickChartData);
      console.log('Done');
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
  xmlHttp.send(null);
}


window.addEventListener('load', () => {
  chartCreation();
  addCompaniesIntoNifty();
  changeCandleStickChart('INFY.NS');
});


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
let showNiftyButton = document.getElementById('show-nifty-button');
let monitorEvent = document.getElementById('monitor-event');
let createEvent = document.getElementById('create-event');
let niftyDiv = document.getElementById('nifty-div');

monitorEventButton.addEventListener('click', function (event) {
  monitorEvent.style.display = 'initial';
  createEvent.style.display = 'none';
  niftyDiv.style.display = 'none';
})

createEventButton.addEventListener('click', function () {
  monitorEvent.style.display = 'none';
  createEvent.style.display = 'initial';
  niftyDiv.style.display = 'none';
})

showNiftyButton.addEventListener('click', function () {
  monitorEvent.style.display = 'none';
  createEvent.style.display = 'none';
  niftyDiv.style.display = 'initial';
})


// MONITOR SCREEN

// Defined the initial number of screens for each event.
let numScreens = {
  // These were earlier present here, not needed now.
  // 'ORB': 3,
  // 'Breakout-RSI': 2,
  // 'Pivot-Touch': 1,
  // 'Event-1': 1,
  // 'Event-2': 1
}

// Currently selected event, 'ORB' by default
let selectedEvent;

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

  if (selectedEvent) document.getElementById(selectedEvent + '-div').style.display = 'none';
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
  customEventCounter--;
  if (customEventCounter == 0) {
    let headings = document.getElementsByClassName('no-event-heading');
    for (let i = 0; i < headings.length; i++) {
      headings[i].style.display = 'initial';
    }
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

let totalCustomEvents = 1;
let customEventCounter = 0;

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
    eventName = 'Custom-Event-' + totalCustomEvents;
    totalCustomEvents++;
    customEventCounter++;
    if (customEventCounter == 1) {
      let headings = document.getElementsByClassName('no-event-heading');
      for (let i = 0; i < headings.length; i++) {
        headings[i].style.display = 'none';
      }
    }
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
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
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
  xmlHttp.send(null);
})


// RISK MANAGEMENT

// Settings toggler
let riskManagementBody = document.getElementById('risk-management-body');
let riskManagementSettings = document.getElementById('risk-management-settings');
let riskManagementSettingsButton = document.getElementById('risk-management-settings-button');
let riskManagementSaveSettings = document.getElementById('risk-management-save-settings');

riskManagementSettingsButton.addEventListener('click', () => {
  riskManagementSettings.style.display = 'initial';
  riskManagementBody.style.display = 'none';
});

riskManagementSaveSettings.addEventListener('click', () => {
  riskManagementSettings.style.display = 'none';
  riskManagementBody.style.display = 'initial';
});

// Changing values for risk management sliders

let confidence = document.getElementById('confidence');
let riskReward = document.getElementById('risk-reward');
let riskPercentage = document.getElementById('risk-percentage');
let confidenceValue = document.getElementById('confidence-value');
let riskRewardValue = document.getElementById('risk-reward-value');
let riskPercentageValue = document.getElementById('risk-percentage-value');

confidence.addEventListener('input', () => {
  confidenceValue.innerText = confidence.value;
});

riskReward.addEventListener('input', () => {
  riskRewardValue.innerText = riskReward.value;
})

riskPercentage.addEventListener('input', () => {
  riskPercentageValue.innerText = riskPercentage.value;
})


// Showing result of risk management

let riskManagementGo = document.getElementById('risk-management-go');
riskManagementGo.addEventListener('click', () => {

  // Hiding the riskmanagement screen and showing the calculating loader
  let calculatingRiskManagement = document.getElementById('calculating-risk-management');
  riskManagementBody.style.display = 'none';
  calculatingRiskManagement.style.display = 'initial';

  // Fetching data from backend

  // Customizing URL
  let riskManagementValue = document.getElementById('risk-management-value');

  var xmlHttp = new XMLHttpRequest();
  let url = backendBaseURL + 'Dashboard/RiskManagement?';
  url += ('confidence=' + Number(confidence.value) / 100);
  url += ('&riskReward=' + riskReward.value);
  url += ('&riskPercentage=' + riskPercentage.value);
  url += ('&value=' + riskManagementValue.value);
  url += ('&companyName=' + selectedCompany);
  console.log(url);

  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      let fetchedData = JSON.parse(xmlHttp.responseText);

      let riskManagementResult = document.getElementById('risk-management-result');
      let riskManagementPosition = document.getElementById('risk-management-position');
      let riskManagementOrder = document.getElementById('risk-management-order');

      // Hiding loader and showing the result div
      calculatingRiskManagement.style.display = 'none';
      riskManagementResult.style.display = 'initial';

      riskManagementPosition.innerText = Number(fetchedData.position).toFixed(0);
      riskManagementOrder.innerText = fetchedData.order;
    }
  }
  console.log('getting');
  xmlHttp.open("GET", url, true); // true for asynchronous 
  xmlHttp.setRequestHeader('Authorization', 'Token ' + jwtToken);
  xmlHttp.send(null);
})


// Reset Risk Management

let riskManagementResetButton = document.getElementById('risk-management-reset-button');
let riskManagementResult = document.getElementById('risk-management-result');

riskManagementResetButton.addEventListener('click', () => {
  riskManagementResult.style.display = 'none';
  riskManagementBody.style.display = 'initial';
})



// Things to do
// 1) Pass on personalized jwt token.
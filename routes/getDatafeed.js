const express = require('express');
const router3 = express.Router();
const path = require('path');
const fetch = require("node-fetch");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const request = require('request');
const cors = require('cors');

var whitelist = ['http://www.zecide.com', 'http://zecide.com'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router3.get('/getFeed',cors(corsOptions), (req, res) => {
            res.send('Welcome to UDF Adapter for TradingView. See ./config for more details.'
)});

router3.get('/getFeed/time', (req, res) => {
        console.log('[time]: Method call')
        const time = Math.floor(Date.now())  // In seconds
        console.log(time);
        res.sendStatus(200).send(time);
    })


router3.get('/getFeed/config',cors(corsOptions),function(req,res){
  var x = {
    supported_resolutions: ['5','30','60'],
    supports_group_request: true,
    supports_marks: false,
    supports_search: false,
    supports_timescale_marks: false,
    supports_time: true
}
res.send(x);
})

router3.get('/getFeed/symbol_info',cors(corsOptions), async (req, res) => {
  console.log('[symbol_info]: Method call')
  console.log(req.query.group);
  var x = {
   symbol: ['INFY.NS', 'ITC.NS', 'UPL.NS', 'CIPLA.NS', 'ASIANPAINT.NS', 'DRREDDY.NS', 'WIPRO.NS', 'HCLTECH.NS', 'HINDALCO.NS', 'MARUTI.NS', 'POWERGRID.NS', 'DIVISLAB.NS', 'ICICIBANK.NS', 'TECHM.NS', 'ADANIPORTS.NS', 'TCS.NS', 'SBIN.NS', 'HDFC.NS', 'BAJFINANCE.NS', 'TATASTEEL.NS', 'ULTRACEMCO.NS', 'TITAN.NS', 'SUNPHARMA.NS', 'M&M.NS', 'RELIANCE.NS', 'HINDUNILVR.NS', 'BAJAJFINSV.NS', 'AXISBANK.NS', 'BRITANNIA.NS', 'NTPC.NS', 'LT.NS', 'KOTAKBANK.NS', 'GRASIM.NS', 'NESTLEIND.NS', 'SHREECEM.NS', 'IOC.NS', 'BPCL.NS', 'BAJAJ-AUTO.NS', 'HEROMOTOCO.NS', 'COALINDIA.NS', 'SBILIFE.NS', 'EICHERMOT.NS', 'HDFCBANK.NS', 'ONGC.NS', 'INDUSINDBK.NS', 'TATAMOTORS.NS', 'HDFCLIFE.NS', 'GAIL.NS', 'JSWSTEEL.NS', 'BHARTIARTL.NS'],
   description: ['INFY.NS', 'ITC.NS', 'UPL.NS', 'CIPLA.NS', 'ASIANPAINT.NS', 'DRREDDY.NS', 'WIPRO.NS', 'HCLTECH.NS', 'HINDALCO.NS', 'MARUTI.NS', 'POWERGRID.NS', 'DIVISLAB.NS', 'ICICIBANK.NS', 'TECHM.NS', 'ADANIPORTS.NS', 'TCS.NS', 'SBIN.NS', 'HDFC.NS', 'BAJFINANCE.NS', 'TATASTEEL.NS', 'ULTRACEMCO.NS', 'TITAN.NS', 'SUNPHARMA.NS', 'M&M.NS', 'RELIANCE.NS', 'HINDUNILVR.NS', 'BAJAJFINSV.NS', 'AXISBANK.NS', 'BRITANNIA.NS', 'NTPC.NS', 'LT.NS', 'KOTAKBANK.NS', 'GRASIM.NS', 'NESTLEIND.NS', 'SHREECEM.NS', 'IOC.NS', 'BPCL.NS', 'BAJAJ-AUTO.NS', 'HEROMOTOCO.NS', 'COALINDIA.NS', 'SBILIFE.NS', 'EICHERMOT.NS', 'HDFCBANK.NS', 'ONGC.NS', 'INDUSINDBK.NS', 'TATAMOTORS.NS', 'HDFCLIFE.NS', 'GAIL.NS', 'JSWSTEEL.NS', 'BHARTIARTL.NS'],
   exchange_listed: "NSE",
   exchange_traded: "NSE",
   minmovement: 1,
   minmovement2: 0,
   pricescale: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1,  1, 1],
   has_dwm: true,
   has_intraday: true,
   has_daily : true,
   has_no_volume: [false, false,false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false,false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
   type: ['stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock', 'stock','stock', 'stock', 'stock',  'stock', 'stock'],
   timezone: "Asia/Kolkata",
   session_regular: "0915-1530"
 }

res.send(x);
    })




router3.get('/getFeed/history',cors(corsOptions),function(req,res){
  let left = req.query.from;
  let right = req.query.to;
  // console.log(left,right);
  let backendBaseURL = 'https://www.backend.zecide.com/';
  let url = backendBaseURL + 'Dashboard/fetchChartData?companyName=' + req.query.symbol;
  // console.log(url);

  request(url, (err, response, body) => {
  if (err) {
    return res.send({ s : "err", errmsg : err});
  }
  body = JSON.parse(body);
  const len = body.length;
  // console.log(body);
  let sendJson = {
    s : "ok",
    o : [],
    t : [],
    c : [],
    h : [],
    l : []
  };
  for(var i =0; i <len ;i+=1){
    // console.log(body[i]);
    if(body[i].time > left && body[i].time < right){
      sendJson.o.push(body[i].open);
      sendJson.t.push(body[i].time);
      sendJson.c.push(body[i].close);
      sendJson.h.push(body[i].high);
      sendJson.l.push(body[i].low);
    }
  }
  if(sendJson.t.length != 0){
    // console.log(sendJson);
    // console.log(sendJson.t);
    res.send(sendJson);
  }else{
    return res.send({
      s : "no_data"
    });
  }
});
});

module.exports = router3;

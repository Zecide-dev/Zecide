const navToggle = () => {
  var e = document.getElementById("burger"),
    t = document.querySelector(".dropdown-content"),
    n = "/src/images/burger.svg";
  e.addEventListener("click", () => {
    t.classList.toggle("dropdown-content-active");
      e.src === n ? (e.src = "/src/images/collapse.svg") : (e.src = n);
  });
};
navToggle();

var preloader = document.querySelector('.preloader');

window.addEventListener('load', function(){
  preloader.style.display= 'none';
  console.log(`%c   ______  _____   _____   _   _____   _____  
  |___  / | ____| /  ___| | | |  _  | | ____| 
     / /  | |__   | |     | | | | | | | |__   
    / /   |  __|  | |     | | | | | | |  __|  
   / /__  | |___  | |___  | | | |_| | | |___  
  /_____| |_____| |_____| |_| |_____/ |_____| 

       
  
         _(____)_
  ___ooO_(_o__o_)_Ooo___
  

Well hello there...
Don’t you have a curious mind, taking a little peek under the hood.
It just so happens we’re always eager to meet curious minds like yours.
Interested in poking into Zecide projects in a MORE in-depth way?
Interested in getting paid for it?

Get in touch with us to know about the opening for our team:
*Insert Email Address*`, "font-family:monospace");
})

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 1000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 100 - Math.random() * 50;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 200;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #3b98ff; }";
  document.body.appendChild(css);
};
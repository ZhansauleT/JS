'use strict';

const title = document.getElementsByTagName("h1")[0];
const buttons = document.getElementsByClassName("handler_btn");
const btn_plus = document.querySelector(".screen-btn");
const other_items_percent = document.querySelectorAll(".other-items.percent");
const other_items_number = document.querySelectorAll(".other-items.number");

const input_range = document.querySelector('.rollback > div > input[type="range"]');
const range_value = document.querySelector('.rollback > div > .range-value');

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];
let screens = document.querySelectorAll(".screen");
const select = document.getElementsByTagName("select");

console.log(select);


const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  screensCount: 0,

  start: function(){
    appData.addScreens();
    appData.addServices();
    appData.addPrices();

    appData.showResult();
  },

  init: function() {
    appData.addTitle();

    if(select.selectedIndex !== -1){
      startBtn.addEventListener('click', appData.start);
    }else if(select.selectedIndex === -1){
      appData.screens.length = 0;
    }
    
    btn_plus.addEventListener('click', appData.addScreenBlock);

    input_range.addEventListener('change', function(){
      range_value.textContent = input_range.value;
    });

  },
  addTitle: function(){
    document.title = title.textContent;
  },

  showResult: function () { 
    total.value = appData.screenPrice;
    totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCountRollback.value = appData.servicePercentPrice;
    totalCount.value = appData.screensCount;
  },

  addScreens: function(){
    appData.screens.length = 0;
    screens = document.querySelectorAll(".screen");

    screens.forEach(function(screen, index) {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });


    //console.log(appData.screens);
    //console.log(appData.screensCount);
  },

  addServices: function () {
    other_items_percent.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if(check.checked){
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });


    other_items_number.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if(check.checked){
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function(){
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function (){
    for(let screen of appData.screens){
      appData.screenPrice += screen.price;
    }

    for(let key in appData.servicesNumber){
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for(let key in appData.servicesPercent){
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key]/100);
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber+appData.servicePricesPercent;
    
    appData.rollback = input_range.value;

    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));

    appData.screensCount = screens.length;
  },

  logger: function() {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  }
};


appData.init();



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
let inputs;

//console.log(select);


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

  reset: function(){

    // //disabling the select options
    // for(let i = 0; i < select.length; i++){
    //   select[i].disabled = false;
    // }

    // //disabling the inputs on the left
    // for(let i = 0; i < inputs.length; i++){
    //   inputs[i].disabled = false;
    // }

    //removing screens from the screens collection
    screens.forEach((screen, index)=> {
      if(index !== 0){
        screen.remove();
      }else{
        const select = screen.querySelector('select');
        const input = screen.querySelector('input');

        select.disabled = false;
        select.selectedIndex = 0;
        input.disabled = false;
        input.value ='';
      }
    });

    //resetting the checkboxes
    other_items_percent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');

      if(check.checked){
        check.checked = false;
      }
    });

    other_items_number.forEach((item) =>{
      const check = item.querySelector('input[type=checkbox]');

      if(check.checked){
        check.checked = false;
      }
    });

    //resetting the calculated prices & counts
    total.value = 0;
    totalCountOther.value = 0;
    fullTotalCount.value = 0;
    totalCountRollback.value = 0;
    totalCount.value = 0;

    //enabling the button to their default functionality
    btn_plus.disabled = false;
    input_range.disabled = false;
    input_range.value = 0;
    range_value.textContent = "0%";
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
  },

  init: function() {
    this.addTitle();

    if(select.selectedIndex !== -1){
      startBtn.addEventListener('click', () => {
        this.start();

        for(let i = 0; i < select.length; i++){
          select[i].disabled = true;
        }

        inputs = document.querySelectorAll(".screen > .main-controls__input > input[type='text']");

        for(let i = 0; i < inputs.length; i++){
          inputs[i].disabled = true;
        }

        btn_plus.disabled = true;
        input_range.disabled = true;
        
        startBtn.style.display = "none";
        resetBtn.style.display = "block";
      });
    }else if(select.selectedIndex === -1){
      this.screens.length = 0;
    }

    resetBtn.addEventListener('click', () =>{
      this.reset();
    });
    
    btn_plus.addEventListener('click', this.addScreenBlock);

    input_range.addEventListener('change', () => {
      range_value.textContent = input_range.value;
    });

  },
  addTitle: function(){
    document.title = title.textContent;
  },

  showResult: function () { 
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
    totalCount.value = this.screensCount;
  },

  addScreens: function(){
    this.screens.length = 0;
    screens = document.querySelectorAll(".screen");

    screens.forEach((screen, index)=> {
      const select = screen.querySelector('select');
      const input = screen.querySelector('input');
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });


    //console.log(appData.screens);
    //console.log(appData.screensCount);
  },

  addServices: function () {
    other_items_percent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if(check.checked){
        this.servicesPercent[label.textContent] = +input.value;
      }
    });


    other_items_number.forEach((item) =>{
      const check = item.querySelector('input[type=checkbox]');
      const label = item.querySelector('label');
      const input = item.querySelector('input[type=text]');

      if(check.checked){
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function(){
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },

  addPrices: function (){
    for(let screen of this.screens){
      this.screenPrice += screen.price;
    }

    for(let key in this.servicesNumber){
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for(let key in this.servicesPercent){
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key]/100);
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber+this.servicePricesPercent;
    
    this.rollback = input_range.value;

    this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

    this.screensCount = screens.length;
  },

  logger: function() {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
  }
};


appData.init();



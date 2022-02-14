'use strict';

const appData = {
  title: '',
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  asking: function () {
    do{
       appData.title = prompt("Как называется ваш проект?");
    }while(appData.isNumber(appData.title));

    for(let i = 0; i < 2; i++){
      let name;
      do{
       name = prompt("Какие типы экранов нужно разработать?");
      }while(appData.isNumber(name));


      let price = 0;

      do{
       price = +prompt("Сколько будет стоить данная работа?");
      }while(!appData.isNumber(price));

      appData.screens.push({id: i, name: name, price: price});
    }

    for(let i = 0; i < 2; i++){
      let name;
      do{
       name = prompt("Какой дополнительный тип услуги нужен?");
      }while(appData.isNumber(name));

      let price = 0;

      do{
        price = +prompt("Сколько это будет стоить?");
      }while(!appData.isNumber(price));

      appData.services[name] = +price;
    }


    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  addPrices: function (){
    for(let screen of appData.screens){
      appData.screenPrice += screen.price;
    }

    for(let key in appData.services){
      appData.allServicePrices += appData.services[key];
    }
  },

  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  getRollbackMessage: function (price) {
    if(price >= 30000){
      return "Даем скидку в 10%";
    }else if(price >= 15000 && price < 30000){
      return "Даем скидку в 5%";
    }else if(price >= 0 && price < 15000){
      return "Скидка не предусмотрена";
    }else {
      return "Что-то пошло не так";
    }
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getTitle: function () {
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim().substr(1).toLowerCase();
  },  

  getServicePercentPrice: function (){
    appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
  },

  logger: function() {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
  },

  start: function(){
    appData.asking();
    appData.addPrices();
    appData.getFullPrice(); 
    appData.getServicePercentPrice();
    appData.getTitle(); 

    appData.logger();
  }
};


appData.start();



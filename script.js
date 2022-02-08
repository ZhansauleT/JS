'use strict'

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");
let screenPrice = +prompt("Сколько будет стоить данная работа?", "12000");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 10;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));

const showTypeOf = function(variable){
  console.log(variable, typeof(variable));
}

const getRollbackMessage = function (price) {
  if(price >= 30000){
    return "Даем скидку в 10%";
  }else if(price >= 15000 && price < 30000){
    return "Даем скидку в 5%";
  }else if(price >= 0 && price < 15000){
    return "Скидка не предусмотрена";
  }else {
    return "Что-то пошло не так";
  }
}

const getAllServicePrices = function() {
  return servicePrice1 + servicePrice2; 
}

function getFullPrice () {
  return screenPrice + allServicePrices;
}

function getTitle (str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function getservicePercentPrices(){
  return fullPrice - (fullPrice * (rollback / 100));
}


showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

let allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(); 
let projectTitle = getTitle(title);

console.log(getRollbackMessage(fullPrice));

// console.log(typeof title);
// console.log(typeof fullPrice);
// console.log(typeof adaptive);
// console.log(screens.length);
// console.log("Стоимость верстки экранов "+" "+screenPrice+" "+"рублей");
// console.log("Стоимость разработки сайта "+fullPrice+" рублей");
console.log(screens.toLowerCase().split(","));
console.log(getservicePercentPrices());
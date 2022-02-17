'use strict';

//changing the order of the books
const books_container = document.querySelector(".books");
const book_item = document.querySelectorAll(".book");

books_container.append(book_item[1]); // book 1
books_container.append(book_item[0]); // book 2
books_container.append(book_item[4]); // book 3
books_container.append(book_item[3]); // book 4
books_container.append(book_item[5]); // book 5
books_container.append(book_item[2]); // book 6

//changing the background image
document.body.style.backgroundImage = "url('image/you-dont-know-js.jpg')";

//changing the book title
document.querySelectorAll(".book")[2].querySelector("h2 > a").innerHTML = "Книга 3. this и Прототипы Объектов";

//deleting the ad
document.querySelector(".adv").remove();

//changing the order of the chapters in 2nd book and in 6th book
//book 2
const chapters = document.querySelectorAll(".book")[1].querySelector("ul");
const chapter_item = chapters.querySelectorAll("li");

chapters.append(chapter_item[0]); 
chapters.append(chapter_item[1]); 
chapters.append(chapter_item[3]);  
chapters.append(chapter_item[6]);  
chapters.append(chapter_item[8]);  
chapters.append(chapter_item[4]); 
chapters.append(chapter_item[5]); 
chapters.append(chapter_item[7]); 
chapters.append(chapter_item[9]); 
chapters.append(chapter_item[10]); 
chapters.append(chapter_item[2]); 

//book 2
const chapters_5 = document.querySelectorAll(".book")[4].querySelector("ul");
const chapter_item_5 = chapters_5.querySelectorAll("li");

chapters_5.append(chapter_item_5[0]); 
chapters_5.append(chapter_item_5[1]); 
chapters_5.append(chapter_item_5[9]); 
chapters_5.append(chapter_item_5[3]); 
chapters_5.append(chapter_item_5[4]); 
chapters_5.append(chapter_item_5[2]); 
chapters_5.append(chapter_item_5[6]); 
chapters_5.append(chapter_item_5[7]); 
chapters_5.append(chapter_item_5[5]); 
chapters_5.append(chapter_item_5[8]); 
chapters_5.append(chapter_item_5[10]); 


//adding the chapter to the 6th book
const chapters_6 = document.querySelectorAll(".book")[5].querySelector("ul");
const chapter_item_6 = chapters_6.querySelectorAll("li");

const new_chapter_item = document.createElement("li");
new_chapter_item.innerHTML = "Глава 8: За пределами ES6";

chapters_6.append(new_chapter_item);
chapters_6.append(chapter_item_6[9]);

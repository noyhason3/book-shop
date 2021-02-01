'use strict';
const KEY = 'books';
var gBooks;

const PAGE_SIZE = 5;
var gPageIdx = 0;
var gSortBy;

function getBooksToShow() {
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function nextPage(diff) {
  gPageIdx += diff;
  var pageCount = getPageCount();
  if (gPageIdx > pageCount) gPageIdx = 0;
  if (gPageIdx < 0) gPageIdx = pageCount;

}

function goToPage(pageIdx) {
  gPageIdx = pageIdx;
  return gPageIdx;
}

function getPageCount() {
  return Math.round(gBooks.length / PAGE_SIZE);
}

function changeBookRate(bookId, diff) {
  var book = getBookById(bookId);
  if (diff>0){
    book.rate++;
    if (book.rate > 10) book.rate = 0;
  }
  if (diff<0){
    book.rate--;
    if (book.rate < 0) book.rate = 10;
  }
  _saveBooksToStorage();
}


function updateBook(bookId, price) {
  var book = getBookById(bookId);
  book.price = price;
  _saveBooksToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id;
  });
  return book;
}

function addBook(title, price) {
  var newBook = _createBook(title, price);
  gBooks.push(newBook);
  _saveBooksToStorage();
}

function removeBook(bookId) {
  var idx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });

  gBooks.splice(idx, 1);
  _saveBooksToStorage();
  return gBooks;
}

function sortBy(sortKey) {
  var books = [...gBooks];
  if (sortKey === 'title' || sortKey === 'id') {
    books.sort(function (book1, book2) {
      return book1[sortKey].localeCompare(book2[sortKey]);
    });
  }
  if (sortKey === 'price') {
    books.sort(function (book1, book2) {
      return book1.price - book2.price;
    });
  }
}

function _createBooks() {
  var books = loadFromStorage(KEY);

  if (!books || !books.length) {
    books = [];

    for (var i = 0; i < 21; i++) {
      var title = makeLorem();
      var price = getRandomIntInclusive(10, 100);
      books.push(_createBook(title, price));
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _createBook(title, price) {
  var book = {
    id: makeId(),
    title,
    price,
    desc: makeLorem(200),
    rate: 0,
  };
  return book;
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks);
}

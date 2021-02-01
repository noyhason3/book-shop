'use strict';

function onInit() {
  _createBooks();
  renderBooks();
  renderPages();
}

function renderBooks() {
  var books = getBooksToShow();

  var strHtml = books.map(function (book) {
    return `<tr class="book book-${book.id}">
      
          <td class="id">${book.id}</td>
          <td>${book.title}</td>
          <td>$${book.price}</td>
          <td class="actions">
          <button class="read" onclick="onReadBook('${book.id}')">Read</button>
          <button class="update" onclick="onOpenUpdateOption('${book.id}')">Update</button>
          <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
          </td>
          </tr> `;
  });

  document.querySelector('.book-container table tbody').innerHTML = strHtml.join('');
}

function renderPages() {
  var pageCount = getPageCount();

  var strHtml = `<button onclick="onNextPage(-1)"><<</button>`;
  for (var i = 0; i < pageCount; i++) {
    strHtml += `<button class="page page-${i}" onclick="onGoToPage(${i})">${i + 1}</button>`;
  }
  strHtml += `<button onclick="onNextPage(1)">>></button>`;
  document.querySelector('.pages').innerHTML = strHtml;
}

function onNextPage(diff){
  nextPage(diff)
  renderBooks();
}

function onGoToPage(pageIdx) { 
  var page = goToPage(pageIdx)
  renderPages();

  var elPage = document.querySelector(`.page-${page}`)
  elPage.style.backgroundColor = 'rgba(180, 60, 60, 0.507)';
  elPage.style.color = 'white';
  renderBooks();
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector('.modal');
  elModal.querySelector('h4').innerText = book.title;
  elModal.querySelector('h5').innerText = '$' + book.price;
  elModal.querySelector('h6').innerHTML = `<button onclick="onChangeRate('${book.id}',-1)"> - </button> <span>${book.rate}</span> <button onclick="onChangeRate('${book.id}', 1)"> + </button>`;
  elModal.querySelector('p').innerText = book.desc;
  elModal.hidden = false;
}

function onChangeRate(bookId, diff) {
  changeBookRate(bookId, diff);
  var book = getBookById(bookId);

  var elModal = document.querySelector('.modal');
  elModal.querySelector('h6 span').innerText = book.rate;
}


function onCloseModal() {
  var elModal = document.querySelector('.modal');
  elModal.hidden = true;
}

function onOpenUpdateOption(bookId) {
  var elUpdateOption = document.querySelector('.add-update-book-option');
  elUpdateOption.hidden = false;
  
  var strHtml = `<h2>Update your book!</h2>
  <form onsubmit="onUpdateBook('${bookId}',event)">
  <input type="text" placeholder="new price" name="newPrice" pattern="\\d+" title="only digits" required/>
  <button>Update</button>
  <button onclick="onCloseAddUpdate()">X</button>
  </form>`;
  
  elUpdateOption.innerHTML = strHtml;
}

function onUpdateBook(bookId, ev) {
  var elUpdateOption = document.querySelector('.add-update-book-option');
  ev.preventDefault()
  var newPrice = document.querySelector('input[name=newPrice]').value;
  elUpdateOption.hidden = true;
  updateBook(bookId, newPrice);
  renderBooks();
}

function onOpenAddOption() {
 var elAddOption = document.querySelector('.add-update-book-option');
  elAddOption.hidden = false;
  
  var strHtml = `<section class="add-book-option">
    <h2>Add a new book!</h2>
    <form onsubmit="onAddBook(event)">
        <input type="text" placeholder="title" name="title" required/>
        <input type="text" placeholder="price" name="price" pattern="\\d+" title="only digits" required/>
        <button>Add</button>
        <button onclick="onCloseAddUpdate()">X</button>
    </form>
    </section>`
    elAddOption.innerHTML = strHtml;
}

function onAddBook(ev) {
  ev.preventDefault()
  var title = document.querySelector('input[name=title]').value;
  var price = document.querySelector('input[name=price]').value;
  document.querySelector('.add-update-book-option').hidden = true;

  addBook(title, price);
  renderBooks();
}
function onCloseAddUpdate(){
  document.querySelector('.add-update-book-option').hidden = true;
}

function onRemoveBook(bookId) {
  removeBook(bookId);
  renderBooks();
  renderPages();
}

function onSortBy(sortKey){
  sortBy(sortKey)
  renderBooks();

}
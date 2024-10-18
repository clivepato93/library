let myLibrary = [
  new Book("Cujo", "Stephen King", 300, false,1),
  new Book("Pet sematary", "Stephen King", 350, false,2),
  new Book("Spiderman", "Stan Smith", 350, false,3),
];

const container = document.querySelector(".book-container");
const addButton = document.querySelector(".new-book");
const clsButton = document.querySelector(".close");
const subButton = document.querySelector(".submit");

function Book(title, author, pages, read,id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pages} pages, ${this.read}`;
  };
}



addButton.addEventListener('click', function (e) {
  document.querySelector('dialog').showModal()
})

subButton.addEventListener('click', function (e) {
  e.preventDefault();
  const newBook = new Book(
    document.querySelector(".title").value,
    document.querySelector(".author").value,
    +document.querySelector(".pages").value,
    document.querySelector(".read").value == "false" ? false : true,
    myLibrary.length
  );
  myLibrary.push(newBook)
  document.querySelector("dialog").close();
  container.appendChild(addBook(newBook))
})

function addBook(book) {
  const currentBook = document.createElement("div");
  currentBook.id = book.id;
  currentBook.classList = "card";
  const title = document.createElement("h2");
  title.innerText = book.title;
  const author = document.createElement("h4");
  author.innerText = book.author;
  const pages = document.createElement("h5");
  pages.innerText = book.pages + " pages";
  const read = document.createElement("button");
  read.innerText = book.read ? "Already Read" : "Not read yet";
  read.addEventListener("click", function (e) {
    e.preventDefault();
    book.read = !book.read;
    if (book.read) {
      read.innerText = "Already Read";
    } else {
      read.innerText = "Not read yet";
    }
    console.log(book.read);
  });
  const btn = document.createElement("button");
  btn.innerText = "remove book";
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    myLibrary.splice(myLibrary.indexOf(book.id), 1);
    // console.log(index, myLibrary);
    container.removeChild(currentBook)
  });
  currentBook.appendChild(title);
  currentBook.appendChild(author);
  currentBook.appendChild(pages);
  currentBook.appendChild(read);
  currentBook.appendChild(btn);

  return currentBook
}
function displayBooks() {

  container.innerHTML = "";
  if (!myLibrary.length) {
    container.innerHTML = 'no books';
  }
  myLibrary.forEach((book) => {
    
    container.appendChild(addBook(book))
  });
}

displayBooks();
// displayBooks();

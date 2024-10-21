const container = document.querySelector(".book-container");
const addButton = document.querySelector(".new-book");
const clsButton = document.querySelector(".close");
const subButton = document.querySelector(".submit");

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}

class Library {
  constructor(array = []) {
    this.array = array;
  }
  removeBook(bookname, id) {
    console.log({ bookname, id, }, typeof id);
    // debugger

    const match = this.array.find((book) => book["id"] === id);
    const book = this.array.splice(
      this.array.indexOf(match),
      1
    );
    console.log(this.array);
    return book
  }

  addBook(book) {

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
      console.log(book);
    });
    const btn = document.createElement("button");
    btn.classList.add('remove')
    btn.innerText = "remove book";
    
    currentBook.appendChild(title);
    currentBook.appendChild(author);
    currentBook.appendChild(pages);
    currentBook.appendChild(read);
    currentBook.appendChild(btn);
    return currentBook;
  }

  displayBooks() {
    container.innerHTML = "";
    if (!this.array.length) {
      container.innerHTML = "no books";
    }
    this.array.forEach((book) => {
      container.appendChild(this.addBook(book));
    });
  }
}

let myLibrary = new Library([
  new Book("Cujo", "Stephen King", 300, false, 1),
  new Book("Pet sematary", "Stephen King", 350, false, 2),
  new Book("Spiderman", "Stan Smith", 350, false, 3),
]);

myLibrary.displayBooks();
console.log(myLibrary.array);
addButton.addEventListener("click", function (e) {
  e.preventDefault()
  document.querySelector("dialog").showModal();
});

const removeBtns = [...document.getElementsByClassName('remove')]
removeBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault()
    console.log(btn.parentNode.id);
    console.dir(myLibrary.removeBook(btn.parentNode.querySelector('h2').innerText,+btn.parentNode.id));
    container.removeChild(btn.parentNode)
  })
})


subButton.addEventListener("click", function (e) {
  e.preventDefault();
  const newBook = new Book(
    document.querySelector(".title").value,
    document.querySelector(".author").value,
    +document.querySelector(".pages").value,
    document.querySelector(".read").value == "false" ? false : true,
    myLibrary.array.length+1
  );
  myLibrary.array.push(newBook);
  document.querySelector("dialog").close();
  container.appendChild(myLibrary.addBook(newBook));
  console.log(myLibrary.array);
});

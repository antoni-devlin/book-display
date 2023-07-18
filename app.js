let userId = "105494066543086834878";
let bookshelves = 4;
let fields =
  "fields=items(id,volumeInfo(title,authors,publishedDate,description,pageCount,imageLinks(thumbnail),infoLink)";

async function getShelves() {
  let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves`;
  let response = await fetch(queryString);
  return response.json();
}

async function getBooks(bookshelfId) {
  let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${bookshelfId}/volumes?${fields})`;
  let response = await fetch(queryString);
  return response.json();
}

function parseBooks(booksObject) {
  booksObject["items"].forEach((book) => {
    let bookId = book.id;
    let title = book.volumeInfo.title;
    let authors = book.volumeInfo.authors;
    let author = authors[0];
    let datePublished = book.volumeInfo.publishedDate;
    let description = book.volumeInfo.description;
    let pageCount = book.volumeInfo.pageCount;
    let thumbnailPath = book.volumeInfo.imageLinks.thumbnail;
    let infoPageURL = book.volumeInfo.infoLink;
    console.log(
      `${bookId} - ${title} by ${author} (${datePublished}) - ${pageCount} pages long
      ${description}
      ${thumbnailPath}
      More info at: ${infoPageURL}
      `
    );
  });
}

parseBooks(await getBooks(4));

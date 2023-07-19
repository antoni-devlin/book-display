import { Book } from "./book";

let userId = "105494066543086834878"; //My Google Books userId - this is publically available
let bookshelves = 4; //temporary hardcoded bookshelf with id "4" - "have read"
let fields =
  "fields=items(id,volumeInfo(title,authors,publishedDate,description,pageCount,imageLinks(thumbnail),infoLink)"; //The Google openbooks api lets you select only certain fields to return in the response, in a way that makes me think of GraphQL... That's what this is doing.

// getShelves is currently unused - it returns a list of google "bookshelves", or categorised lists of "have read", "want to read", "currently reading"
// The idea is to iterate over thhe shelves, and pass shelf ids to the functions below to access all books across all shelves
async function getShelves() {
  let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves`;
  let response = await fetch(queryString);
  return response.json();
}

// getBooks takes a shelfId, and makes a fetch request to the api to get all the books on this shelf
async function getBooks(bookshelfId: number) {
  let queryString = `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${bookshelfId}/volumes?${fields})`;
  let response = await fetch(queryString);
  return response.json();
}

// parsebooks parses the json response received from getBooks to make each bit of data easier to work with

function constructBooks(jsonResponse: any) {
  let ids = jsonResponse["items"].map((x: any) => x.id);
  let titles = jsonResponse["items"].map((x: any) => x.volumeInfo.title);
  console.log(ids, titles);
}
constructBooks(await getBooks(4));

// function parseBooks(booksObject: any) {
//   booksObject["items"].forEach((book: any) => {
//     let bookId = book.id;
//     let title = book.volumeInfo.title;
//     let authors = book.volumeInfo.authors;
//     let author = authors[0];
//     let datePublished = book.volumeInfo.publishedDate;
//     let description = book.volumeInfo.description;
//     let pageCount = book.volumeInfo.pageCount;
//     let thumbnailPath = book.volumeInfo.imageLinks.thumbnail;
//     let infoPageURL = book.volumeInfo.infoLink;
//     console.log(
//       `${bookId} - ${title} by ${author} (${datePublished}) - ${pageCount} pages long
//       ${description}
//       ${thumbnailPath}
//       More info at: ${infoPageURL}
//       `
//     );
//   });
// }

// parseBooks(await getBooks(4));

parseBooks(await getBooks(4));

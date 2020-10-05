import React from "react";
import PropTypes from "prop-types";

import Book from "./Book";

const BookShelf = ({ BookShelfTitle, books, updateBookToShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{BookShelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <li key={book.id}>
                <Book
                  bookSize="large"
                  book={book}
                  updateBookToShelf={updateBookToShelf}
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  BookShelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBookToShelf: PropTypes.func.isRequired,
}

export default BookShelf;

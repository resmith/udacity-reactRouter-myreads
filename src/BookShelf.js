import React, { Component } from "react";
import PropTypes from "prop-types";

import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    updateBookToShelf: PropTypes.func.isRequired,
  };

  render() {
    const { BookShelfTitle, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{BookShelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              return (
                <li key={book.id}>
                  <Book 
                  book={book} 
                  updateBookToShelf={this.props.updateBookToShelf}
                  />
                </li>    
              )
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;

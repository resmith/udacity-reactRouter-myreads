import React from "react";
import { Link } from "react-router-dom";

import { search, update } from "./BooksAPI";
import Book from "./Book";

const MAX_QUERY_RESULTS = 50;
const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

// Timer code for search from: https://gist.github.com/bvaughn/982ab689a41097237f6e9860db7ca8d6
class BooksSearch extends React.Component {
  state = {
    value: "",
  };
  timer = null;

  handleChange = (e) => {
    clearTimeout(this.timer);
    this.setState({ value: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.triggerChange();
    }
  };

  triggerChange = () => {
    const { value } = this.state;
    search(value, MAX_QUERY_RESULTS)
      .then((matchingBooks) => {
        this.setState({
          books: matchingBooks.filter(
            (book) => book.shelf  === undefined || book.shelf === "none"
          ),
          validResponse: true,
        });
      })
      .catch((error) => {
        console.log(`error: ${error}`);
        this.setState({
          books: [],
          validResponse: false,
        });
      });
  };

  updateBookToShelf = (bookId, newShelf) => {
    const updatedBook = this.state.books.filter(
      (book) => book.id === bookId
    )[0];
    updatedBook.shelf = newShelf;
    this.setState((prevState) => ({
      books: [
        ...prevState.books.filter((book) => book.id !== bookId),
        updatedBook,
      ],
    }));

    // (book) => (book.id !== bookId) && (book.shelf === null || book.shelf === "none")

    // >>> TODO: API Doesn't seem to update the bookshelf
    update(bookId, newShelf)
      .then((response) => {
        console.log("update response: ", response);
        // >>> TODO: API Doesn't seem to update the bookshelf
        // Once API is working, then uncomment the following line
        // this.setState( { book: response })
      })
      .catch((error) => {
        console.log(`error: ${error}`);
      });
  };

  state = {
    books: [],
    value: "",
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.value}
              placeholder="Search by title or author"
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.validResponse &&
              Array.isArray(this.state.books) &&
              this.state.books.filter((book) => book.shelf === undefined || book.shelf === "none").map((book) => {
                return (
                  <li key={book.id}>
                    <Book
                      book={book}
                      bookSize="small"
                      updateBookToShelf={this.updateBookToShelf}
                    />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BooksSearch;

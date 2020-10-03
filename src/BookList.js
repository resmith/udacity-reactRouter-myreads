import React from "react";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";

import { getAll, update } from "./BooksAPI";
import BookShelf from "./BookShelf";

class BookList extends React.Component {
  static propTypes = {
    // No props required
  };

  componentDidMount() {
    if (!this.state.dataRetrieved) {
      getAll().then((allBooks) => {
        this.setState({
          books: allBooks.filter((book) => book.shelf !== "none"),
        });
        this.setState({ dataRetrieved: true });
      });
    }
  }

  updateBookToShelf = (bookId, newShelf) => {
    const updatedBook = this.state.books.filter((book) => book.id === bookId)[0];
    updatedBook.shelf = newShelf;
    this.setState((prevState) => ({
      books: [...prevState.books.filter((book) => book.id !== bookId), updatedBook ],
    }));

    // >>> TODO: API Doesn't seem to update the bookshelf
    update(bookId, newShelf)
    .then((response) => {
      console.log("update response: ", response);
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
  };

  state = {
    books: [],
    dataRetrieved: false,
  };

  render() {

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              BookShelfTitle="Currently Reading"
              updateBookToShelf={this.updateBookToShelf}
              books={this.state.books.filter(
                (book) => book.shelf === "currentlyReading"
              )}
            />
            <BookShelf
              BookShelfTitle="Want to Read"
              updateBookToShelf={this.updateBookToShelf}
              books={this.state.books.filter(
                (book) => book.shelf === "wantToRead"
              )}
            />
            <BookShelf
              BookShelfTitle="Read"
              updateBookToShelf={this.updateBookToShelf}
              books={this.state.books.filter((book) => book.shelf === "read")}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;

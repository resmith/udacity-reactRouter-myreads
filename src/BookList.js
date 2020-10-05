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

  updateBookToShelf = (id, newShelf) => {
    const updatedBook = this.state.books.filter((book) => book.id === id)[0];
    let prevShelf = updatedBook.shelf;
    updatedBook.shelf = newShelf;
    this.setState((prevState) => ({
      books: [...prevState.books.filter((book) => book.id !== id), updatedBook],
    }));

    // Note: update does not give an error if there is an issue with the update (e.g. { idXYZ: 0 })
    update({ id }, newShelf)
    .then((response) => {
      console.log("update response: ", response);
    })
      .catch((error) => {
        console.log(`updateBookToShelf update error: ${error}`);
        updatedBook.shelf = prevShelf;
        this.setState((prevState) => ({
          books: [...prevState.books.filter((book) => book.id !== id), updatedBook],
        }));
      });
  };

  state = {
    books: [],
    dataRetrieved: false,
  };

  render() {
    const BOOK_SHELVES = [
      {
        title: "Currently Reading",
        id: "currentlyReading",
      },
      {
        title: "Want To Read",
        id: "wantToRead",
      },
      {
        title: "Read",
        id: "read",
      },
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {BOOK_SHELVES.map((bookShelf) => (
            <BookShelf
              key={bookShelf.id}
              BookShelfTitle={bookShelf.title}
              updateBookToShelf={this.updateBookToShelf}
              books={this.state.books.filter(
                (book) => book.shelf === bookShelf.id
              )}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList;

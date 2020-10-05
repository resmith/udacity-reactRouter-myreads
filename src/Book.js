import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    bookSize: PropTypes.string.isRequired,
    updateBookToShelf: PropTypes.func.isRequired,
  };

  onChangeSelect = (selectedShelf) => {
    this.props.updateBookToShelf(this.props.book.id, selectedShelf);
  };

  render() {
    const { book, bookSize } = this.props;

    let bookBackgroundImage, bookImageWidth, bookImageHeight;
    if (bookSize === "small") {
      bookBackgroundImage =
        book.imageLinks && book.imageLinks.smallThumbnail
          ? `url("${book.imageLinks.smallThumbnail}")`
          : "";
      bookImageWidth = 65;
      bookImageHeight = 95;
    } else {
      bookBackgroundImage =
        book.imageLinks && book.imageLinks.smallThumbnail
          ? `url("${book.imageLinks.smallThumbnail}")`
          : "";
      bookImageWidth = 129;
      bookImageHeight = 193;
    }

    return (
      <div className="book">
        <div className={bookSize === "small" ? "book-top-small" : "book-top"}>
          <div
            className="book-cover"
            style={{
              width: bookImageWidth,
              height: bookImageHeight,
              backgroundImage: bookBackgroundImage,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              onChange={(event) => this.onChangeSelect(event.target.value)}
              value={book.shelf ? book.shelf : "none"}
            >
              <option value="moveTo" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.length !== 0
            ? book.authors.map(
                (author, index) =>
                  `${author}${
                    book.authors.length > 1 && index !== book.authors.length - 1
                      ? ", "
                      : ""
                  }`
              )
            : ""}
        </div>
      </div>
    );
  }
}

export default Book;

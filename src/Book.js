import React, { Component } from 'react';
import BookShelfChanger from './BookShelfChanger';

class Book extends Component {
  handleShelfChange = (e) => {// Handles the BookShelfChanger event and adds the book obj
    this.props.handleShelfChange( //From BookShelf and up, the signature is (book, shelf)
      this.props.book,
      e.target.value
    )
  }

  render() {
    const { book, shelfNames } = this.props;
    return(
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`
              }}
            >
            </div>
            <BookShelfChanger
              bookID={book.id}
              shelfNames={shelfNames}
              currentShelf={book.shelf}
              handleShelfChange={this.handleShelfChange} //own method, and not the received in props
            />
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors[0]}</div>
        </div>
    )
  }
}

export default Book;
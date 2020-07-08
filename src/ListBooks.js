import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  groupByShelf = (books) => {
    return books.reduce((booksByShelf, book) => {
      (booksByShelf[book.shelf] = booksByShelf[book.shelf] || []).push(book);
      return booksByShelf;
    }, {});
  };

  render() {
    const { bookList, handleShelfChange, shelfNames } = this.props;
    const shelfBookList = this.groupByShelf(bookList);
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelfBookList).map((shelfNameID) => (
              <span key={shelfNameID}>
                <BookShelf
                  shelfName={shelfNames[shelfNameID].name}
                  shelfNames={shelfNames}
                  shelfBookList={shelfBookList[shelfNameID]}
                  handleShelfChange={handleShelfChange}
                />
              </span>
            ))}
          </div>
        </div>
        <Link to='/search' className="open-search">
          Add a book
        </Link>
      </div>
    );
  }
}

export default ListBooks;
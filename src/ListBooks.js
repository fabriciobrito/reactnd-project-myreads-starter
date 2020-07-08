import React, { Component } from 'react';
import BookShelf from './BookShelf';

const shelfNames = {
  currentlyReading: {name: 'Currently Reading'},
  wantToRead: {name: 'Want to Read'},
  read: {name: 'Read'},
  none: {name: 'None'}
};

class ListBooks extends Component {
  groupByShelf = (books) => {
    return books.reduce((booksByShelf, book) => {
      (booksByShelf[book.shelf] = booksByShelf[book.shelf] || []).push(book);
      return booksByShelf;
    }, {});
  };

  render() {
    const { bookList, handleShelfChange } = this.props;
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
        <div className="open-search">
          <button onClick={() => this.props.handleShowSearchPageChange(true)}>Add a book</button>
        </div>
      </div>
    );
  }
}

export default ListBooks;
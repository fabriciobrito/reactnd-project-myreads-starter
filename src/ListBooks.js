import React, { Component } from 'react';
import BookShelf from './BookShelf';

const shelfBeautifulNames = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

class ListBooks extends Component {
  groupByShelf = (books) => {
    return books.reduce((booksByShelf, book) => {
      (booksByShelf[book.shelf] = booksByShelf[book.shelf] || []).push(book);
      return booksByShelf;
    }, {});
  };

  render() {
    const { bookList } = this.props;
    const shelfBookList = this.groupByShelf(bookList);
    console.log(shelfBookList);
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Object.keys(shelfBookList).map((shelfName) => (
              <span key={shelfName}>
                <BookShelf
                  shelfName={shelfBeautifulNames[shelfName]}
                  shelfBookList={shelfBookList[shelfName]}
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
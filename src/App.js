import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css'

const shelfNames = {
  currentlyReading: {name: 'Currently Reading'},
  wantToRead: {name: 'Want to Read'},
  read: {name: 'Read'},
  none: {name: 'None'}
};

class BooksApp extends React.Component {
  state = {
    books: [] //Needs to be stored in App because it is used by SearchBooks and ListBooks
  };

  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then((ret) => {
      this.updateBooks();
    });
  };

  handleShowSearchPageChange = (value) => {
    this.setState({showSearchPage: value});
  };

  updateBooks() {
    BooksAPI.getAll().then((books) => (
      this.setState({
        books
      })
    ));
  };

  /**
   * Builds a list with book IDs and shelf name with every book in any shelf
   *
   * @returns Object[book ID]: shelf
   * @memberof BooksApp
   */
  booksInShelves() {
    return this.state.books.reduce((list, book) => {
      list[book.id] = book.shelf;
      return list;
    }, {})
  }

  componentDidMount() {
    this.updateBooks();
  }

  render() {
    const booksInShelves = this.booksInShelves();
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            booksInShelves={booksInShelves}
            shelfNames={shelfNames}
            handleShelfChange={this.handleShelfChange}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            bookList={this.state.books}
            handleShelfChange={this.handleShelfChange}
            shelfNames={shelfNames}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

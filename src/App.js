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

  componentDidMount() {
    this.updateBooks();
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            shelfNames={shelfNames}
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

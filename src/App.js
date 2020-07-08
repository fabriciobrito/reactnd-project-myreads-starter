import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

import './App.css'

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
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            bookList={this.state.books}
            handleShelfChange={this.handleShelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp

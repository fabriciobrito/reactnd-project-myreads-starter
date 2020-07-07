import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  handleShowSearchPageChange = (value) => {
    this.setState({showSearchPage: value});
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => (
      this.setState((prevState) => ({
        books: prevState.books.concat(books)
      }))
    ));
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks
            handleShowSearchPageChange={this.handleShowSearchPageChange}
          />
        ) : (
          <ListBooks
            bookList={this.state.books}
            handleShowSearchPageChange={this.handleShowSearchPageChange}
          />
        )}
      </div>
    )
  }
}

export default BooksApp

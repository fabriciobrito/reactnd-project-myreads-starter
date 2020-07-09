import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = {
    query: '',
    results: []
  };

  handleQueryChange = (q) => {
    this.setState({
      query: q
    })
    q && this.searchBooks(q);
  };

  searchBooks = (query) => {
    BooksAPI.search(query).then((results) => {
      results = (results.error?[]:this.updateResultShelves(results))
      this.setState({
        results
      })
    })
  };

  updateResultShelves(list){
    return list.map((b) => {
      b.shelf = this.props.booksInShelves[b.id] || 'none';
      return b;
    })
  }

  /**
   * Whenever the books in shelves changes in props, the result state
   * is updated to reflect the current shelf of the book.
   *
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    prevProps.booksInShelves !== this.props.booksInShelves &&
      this.setState({
        results: this.updateResultShelves(this.state.results)
      })
  }

  render() {
      const { shelfNames, handleShelfChange } = this.props;
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
                onChange={(e) => (this.handleQueryChange(e.target.value))}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.results.map((book) => (
                <li key={book.id}>
                  <Book
                    book={book}
                    shelfNames={shelfNames}
                    handleShelfChange={handleShelfChange}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      )
  }
}

export default SearchBooks;
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      console.log(results);
    })
  };

  render() {
      return(
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/' className="close-search">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
                onChange={(e) => (this.handleQueryChange(e.target.value))}
              />

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      )
  }
}

export default SearchBooks;
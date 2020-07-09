import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = (props) => {
  const { shelfName, shelfNames, shelfBookList, handleShelfChange} = props;
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {shelfBookList && shelfBookList.map((book) => (
              <li key={book.id}>
                <Book
                  shelfNames={shelfNames}
                  book={book}
                  handleShelfChange={handleShelfChange}
                />
              </li>
            ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  shelfNames: PropTypes.object.isRequired,
  shelfBookList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleShelfChange: PropTypes.func.isRequired
}

export default BookShelf;
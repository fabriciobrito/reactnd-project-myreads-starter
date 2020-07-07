import React from 'react';
import Book from './Book';

const BookShelf = (props) => {
  const { shelfName, shelfBookList } = props;
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
            {shelfBookList && shelfBookList.map((book) => (
              <li key={book.id}>
                <Book book={book}/>
              </li>
            ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf;
import React from 'react';
import PropTypes from 'prop-types';

const BookShelfChanger = (props) => {
  const { bookID, currentShelf, shelfNames, handleShelfChange } = props;
  return(
    <div className="book-shelf-changer">
        <select value={currentShelf} onChange={handleShelfChange}>
          <option value="move" disabled>Move to...</option>
          {Object.keys(shelfNames).map((shelf) => (
            <option
              key={`${bookID}_${shelf}`} // using BookID to make it unique
              value={shelf}
            >{shelfNames[shelf].name}</option>
          ))}
        </select>
      </div>
  )
}

BookShelfChanger.propTypes = {
  bookID: PropTypes.string.isRequired,
  currentShelf: PropTypes.string.isRequired,
  shelfNames: PropTypes.object.isRequired,
  handleShelfChange: PropTypes.func.isRequired
}

export default BookShelfChanger;
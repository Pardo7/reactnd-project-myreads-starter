import React from "react";
import PropTypes from "prop-types";
import Book from './Book';

function BookShelf(props) {
	const titles = {
		currentlyReading: 'Currently Reading',
		wantToRead: 'Want To Read',
		read: 'Read'
	};

	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{titles[props.shelfTitle]}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map(book => <Book key={book.title} book={book} handleShelfChange={props.handleShelfChange} />)}
				</ol>
			</div>
		</div>
	);
}

BookShelf.propTypes = {
	shelfTitle: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	handleShelfChange: PropTypes.func.isRequired
};

export default BookShelf;

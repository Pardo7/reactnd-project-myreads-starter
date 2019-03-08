import React from "react";
import PropTypes from "prop-types";
import Book from './Book';

function CurrentlyReadingBooks(props) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">Currently Reading</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map(book => <Book key={book.title} book={book} handleShelfChange={props.handleShelfChange} />)}
				</ol>
			</div>
		</div>
	);
}

CurrentlyReadingBooks.propTypes = {
	books: PropTypes.array.isRequired,
	handleShelfChange: PropTypes.func.isRequired
};

export default CurrentlyReadingBooks;

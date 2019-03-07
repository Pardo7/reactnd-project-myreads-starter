import React from "react";
import Book from './Book';

function WantToReadBooks(props) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">Want to Read</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map(book => <Book key={book.title} book={book} handleShelfChange={props.handleShelfChange} />)}
				</ol>
			</div>
		</div>
	);
}

export default WantToReadBooks;

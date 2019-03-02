import React from "react";
import Book from './Book';

function CurrentlyReadingBooks(props) {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">Currently Reading</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map(book => <Book key={book.bookTitle} book={book}/>)}
				</ol>
			</div>
		</div>
	);
}

export default CurrentlyReadingBooks;

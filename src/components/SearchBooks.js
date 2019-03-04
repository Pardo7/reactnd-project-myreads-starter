import React from "react";
import Book from "./Book";
import { Link } from "react-router-dom";

function SearchBooks(props) {
	return (
		<div className="search-books">
			<div className="search-books-bar">
				<Link className="close-search" to="/" onClick={props.clearSearchResults}>
					Close
				</Link>
				<div className="search-books-input-wrapper">
					<input
						type="text"
						placeholder="Search by title or author"
						onChange={props.onSearchBooks}
					/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
					{props.books &&
						props.books.map(book => {
							return <Book key={book.bookTitle} book={book} />;
						})}
				</ol>
			</div>
		</div>
	);
}

export default SearchBooks;

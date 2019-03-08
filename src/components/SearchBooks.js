import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";
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
							return <Book key={book.id} book={book} handleShelfChange={props.handleShelfChange}/>;
					})}
				</ol>
			</div>
		</div>
	);
}

SearchBooks.propTypes = {
	clearSearchResults: PropTypes.func.isRequired,
	handleShelfChange: PropTypes.func.isRequired,
	onSearchBooks: PropTypes.func.isRequired,
	books: PropTypes.array.isRequired
};

export default SearchBooks;

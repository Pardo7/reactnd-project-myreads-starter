import React from "react";
import PropTypes from "prop-types";

function Book(props) {
	const { title, authors, shelf} = props.book;
	const { thumbnail } = props.book.imageLinks || '';
	const {handleShelfChange} = props;

	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 192,
							backgroundImage: `url(${thumbnail})`
						}}
					/>
					<div className="book-shelf-changer">
						<select readOnly value={shelf || 'move'} onChange={e => handleShelfChange(e, props.book)}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{ title }</div>
				<div className="book-authors">{ authors }</div>
			</div>
		</li>
	);
}

Book.propTypes = {
	book: PropTypes.object.isRequired,
	handleShelfChange: PropTypes.func.isRequired
};

export default Book;

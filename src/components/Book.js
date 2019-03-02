import React from "react";

function Book(props) {
	const {backgroundImage, bookTitle, bookAuthor} = props.book;
	return (
		<li>
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 192,
							backgroundImage: backgroundImage
						}}
					/>
					<div className="book-shelf-changer">
						<select>
							<option value="move" disabled>
								Move to...
							</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{ bookTitle }</div>
				<div className="book-authors">{ bookAuthor }</div>
			</div>
		</li>
	);
}

export default Book;

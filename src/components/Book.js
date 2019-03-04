import React from "react";

function Book(props) {
	const {backgroundImage, bookTitle, bookAuthor, shelf} = props.book;
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
							backgroundImage: backgroundImage
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
				<div className="book-title">{ bookTitle }</div>
				<div className="book-authors">{ bookAuthor }</div>
			</div>
		</li>
	);
}

export default Book;

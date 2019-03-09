import React from "react";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBooks from "./components/SearchBooks";
import CurrentlyReadingBooks from './components/CurrentlyReadingBooks';
import WantToReadBooks from './components/WantToReadBooks';
import ReadBooks from './components/ReadBooks';
import "./App.css";

class BooksApp extends React.Component {
  static propTypes = {
    books: PropTypes.shape({
      currentlyReading: PropTypes.Array,
      read: PropTypes.Array,
      wantToRead: PropTypes.array
    }),
    searchedBooks: PropTypes.array
  }

  state = {
    books: {
      currentlyReading: [],
      read: [],
      wantToRead: []
    },
    searchedBooks: [],
  };
  /**
	 * Lifecycle callback which submits and api request for initial books user data.
	 *
	 * @method componentDidMount
	 *
	 */
 componentDidMount() {
   BooksAPI.getAll().then(results => {
    if (results.error || results === undefined) return;
    this.setState({books : this.structureShelfCategories(results)});
  });
 }
  /**
	 * The 'handleShelfChange' method submits an api request to update
	 * the shelf destination of a book.
	 *
	 * @method handleShelfChange
	 * @param {event}
   * @param {book}
	 */
  handleShelfChange = (event, book) => {
    event.preventDefault();
    const destination = event.target.value;

    BooksAPI.update(book, destination).then(res => {
      this.updateBookShelf(book, destination);
    }).catch(err => console.error(err));
  }
  /**
	 * The 'updateBookShelf' method handles updating the component
	 * state of where an individual book as been moved from --> to.
	 *
	 * @method updateBookShelf
	 * @param {book}
   * @param {destination}
	 */
  updateBookShelf(book, destination) {
    const prevShelf = book.shelf || null;
    this.setState(prevState => {
      if (prevShelf) prevState.books[prevShelf] = this.removeFromShelf(prevState, prevShelf, book);
      if (destination !== 'none') {
        book.shelf = destination;
        prevState.books[destination].push(book);
      }
      return {prevState};
    });
  }
  /**
	 * The 'removeFromShelf' method removed a book from its existing
	 * shelf category.
	 *
	 * @method removeFromShelf
	 * @param {shelfs}
   * @param {shelfName}
   * @param {book}
   * @returns {Object|Array}
	 */
  removeFromShelf(shelfs, shelfName, book) {
    return shelfs.books[shelfName].filter(currentBook => currentBook.title !== book.title);
  }
  /**
	 * The 'structureShelfCategories' method creates a custom object model
	 * to more efficiently look up and categorize books by their respective
	 * categories.
   *
	 * @method structureShelfCategories
	 * @param {books}
   * @returns {(Object|Array)}
	 */
  structureShelfCategories(books) {
    let acc = {currentlyReading: [], read: [], wantToRead: []};
    return books.reduce((acc, book) => {
      acc[book.shelf].push(book);
      return acc;
    }, acc);
  }
  /**
	 * The 'setSearchResults' method accepts the results provided by the api
   * search query and applies the shelf property to results that already
   * exist on a shelf.
	 *
   *
	 * @method setSearchResults
	 * @param {books}
   * @returns {(Object|Array)}
	 */
  setSearchResults(books) {
    const formattedBooks = books.map(currentBook => {
      const shelfCategory = this.bookExists(currentBook);
      if (shelfCategory) currentBook.shelf = shelfCategory;
      return currentBook;
    });
    this.setState({searchedBooks: formattedBooks});
  }

  clearSearchResults = () => {
    this.setState({searchedBooks: []});
  }
  /**
	 * The 'bookExists' method filters through all shelfs for a particular
   * book. if the book exists, the shelf category is returned. if not,
	 * a boolean is returned 'false';
   *
	 * @method bookExists
	 * @param {book}
   * @returns {String || Boolean}
	 */
  bookExists = book => {
    const exists = [...Object.values(this.state.books)].reduce((acc, category) => {
      category.filter(currBook => {
        if (currBook.id === book.id) acc = currBook.shelf;
      });
      return acc;
    }, false);
    return exists;
  }
  /**
	 * The 'searchBooks' method submits and api request to search for books
   *
	 * @method searchBooks
	 * @param {event}
	 */
  searchBooks = event => {
    event.preventDefault();
    if (event.target.value === '') return this.clearSearchResults();

    BooksAPI.search(event.target.value).then(results => {
      if (results.error) return this.clearSearchResults();;
      this.setSearchResults(results);
    })
    .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() =>
          <SearchBooks onSearchBooks={this.searchBooks}
                       books={this.state.searchedBooks}
                       clearSearchResults={this.clearSearchResults}
                       handleShelfChange={this.handleShelfChange}/>
        }/>

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReadingBooks books={this.state.books.currentlyReading} handleShelfChange={this.handleShelfChange}/>
                <WantToReadBooks books={this.state.books.wantToRead} handleShelfChange={this.handleShelfChange}/>
                <ReadBooks books={this.state.books.read} handleShelfChange={this.handleShelfChange}/>
              </div>
            </div>
            <div className="open-search">
              <Link className="open-search" to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    );
  }
}

export default BooksApp;

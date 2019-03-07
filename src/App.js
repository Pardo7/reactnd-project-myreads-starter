import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import SearchBooks from "./components/SearchBooks";
import CurrentlyReadingBooks from './components/CurrentlyReadingBooks';
import WantToReadBooks from './components/WantToReadBooks';
import ReadBooks from './components/ReadBooks';
import "./App.css";

class BooksApp extends React.Component {
  state = {
    searchedBooks: [],
    books: {
      currentlyReading: [],
      read: [],
      wantToRead: []
    }
  };

 componentDidMount() {
   BooksAPI.getAll().then(results => {
    if (results.error || results === undefined) return;
    this.setState({books : this.structureShelfCategories(results)});
  });
 }

  handleShelfChange = (event, book) => {
    event.preventDefault();
    const destination = event.target.value;
    const prevShelf = book.shelf || null;
    BooksAPI.update(book, destination).then(res => {
      this.setState(prevState => {
        if (prevShelf) prevState.books[prevShelf] = this.removeFromShelf(prevState, prevShelf, book);
        if (destination !== 'none') {
          book.shelf = destination;
          prevState.books[destination].push(book);
        }
        return {prevState};
      });
    }).catch(err => console.log(err));
  }

  removeFromShelf(shelfs, shelfName, book) {
    return shelfs.books[shelfName].filter(currentBook => currentBook.title !== book.title);
  }

  structureShelfCategories(books) {
    let acc = {currentlyReading: [], read: [], wantToRead: []};
    return books.reduce((acc, book) => {
      acc[book.shelf].push(book);
      return acc;
    }, acc);
  }

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

  bookExists = book => {
    const exists = [...Object.values(this.state.books)].reduce((acc, category) => {
      category.filter(currBook => {
        if (currBook.id === book.id) acc = currBook.shelf;
      });
      return acc;
    }, false);
    return exists;
  }

  searchBooks = event => {
    event.preventDefault();
    if (event.target.value === '') return this.clearSearchResults();

    BooksAPI.search(event.target.value).then(results => {
      if (results.error) return;
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

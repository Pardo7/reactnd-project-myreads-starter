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
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
    showSearchPage: false
  };

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => <SearchBooks />} />

        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentlyReadingBooks/>
                <WantToReadBooks/>
                <ReadBooks/>
              </div>
            </div>
            <div className="open-search">
              <Link className="open-search" to="/search">Add a book</Link>
            </div>
          </div>
        )}
        />
      </div>
    );
  }
}

export default BooksApp;

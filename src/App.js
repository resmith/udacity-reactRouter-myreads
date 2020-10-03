import React from "react";
// import * as BooksAPI from './BooksAPI'
import { Switch, Route } from "react-router-dom";

import "./App.css";
import BookList from "./BookList";
import BooksSearch from "./BooksSearch";

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search">
            <BooksSearch />
          </Route>
          <Route path="/">
            <BookList />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

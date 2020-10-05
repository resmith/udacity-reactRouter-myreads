## Overview of the My Reading application architecture

This is the MyReads project for Udacity's React Course. This project focuses on state and React Router. This is from Part 2: React Fundamentals - My Reads - A Book Tracking App.

The intention is to create a goodreads type application that is used for seaching for books and putting them on book shelves for reference. For example, the bookshelves currently are: "Currently Reading", "Read", "Want to Read". The book shelves are defined in /src/BookList.js.

- Note: The book shelve constants (name and id) can be moved out to a constant file, but as they're referenced only by BookList it was decided to leave them within that component. \*

### Components / Responsibilities

All components are in the /src directory

App.js - Responsible for routing. The two primary routes are: BookList and Search - inputs: none

BookList - container responsible for including all the various booksShelfs. Passes to the individual bookshelf the Book Shelf Title (e.g. "Currently Reading") and BookShelf
id (e.g. "currentlyReading") - inputs: none

BookShelf - Responsible for rendering a specific bookshelf
Includes the books component to render the books on each shelf

           inputs:
            Receives:
                Book Shelf Title (e.g.  "Currently Reading")
                BookShelf id (e.g. "currentlyReading")

            external calls:
            Calls the BookApi for the books that should be shown on the specific bookshelf

Book: Responsible for displaying the book, specifically the book information (title, author), image and a component for showing and changing the bookshelf a book is on

    inputs: the book information via props

Search: Responsbile for listing the books meeting the user keyed search terms
inputs: none
does provide a GUI for the user to enter search terms

            external calls:
            Calls the BookApi for the books that match the search criteria


### Component Heirarchy

├── BookList - contains the list of bookshelves
└── BookShelf - renders each individual bookshelf
└── Book - renders each book

├── BookSearch - Container for the book search logic
└── Book - renders each book

## Install

To utilize this application

1. Ensure that NPM is installed (https://www.npmjs.com/get-npm)
2. Clone this project
   git clone git@github.com:resmith/udacity-react-proj-l5ReactRouter-myreads.git
3. cd to the project directory
4. Install the project dependencies with `npm install`
5. Start the development server with `npm start`

## What You're Getting

```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
└── src
    ├── App.js # The root of the app. The router handler wraps the app here
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend Server

A back-end server is utilized that provides an API for accessing the books.
The API is at: https://reactnd-books-api.udacity.com

The file [`BooksAPI.js`](src/BooksAPI.js) contains the methods needed to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll();
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf);
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults);
```

- query: `<String>`
- maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).



## Overview of the My Reading application architecture


### Overview
App.js - Responsible for only the routing over the two
  |- BookList - responsible for 
  |- Search


BookList
  |- BookShelf - responsible for listing the books on the bookshelf
      |- Book


### Responsibilities
App.js - Responsible for only the routing over the two primary functions: BookList and Search
       - inputs: only the route


BookList - responsible for knowing the various booksShelfs & calling them via props
         - inputs: none

BookShelf - responsible for listing the books on the bookshelf
           inputs: 
            1) from calling compoment -> Shelf Title & the shelfFieldName used for filtering books
            2) The BookApi for the books that should be shown on the specific bookshelf

Book: Responsible for displaying the book information (title, author, image)
    inputs: the book information via props

Search: Responsbile for listing the books meeting the user keyed search terms
  inputs: only the user search terms entered



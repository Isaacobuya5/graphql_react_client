import React, { useState } from "react";
import { graphql } from "react-apollo";
import styled from "styled-components";

import BookDetails from "./BookDetails";
import { getBookQuery } from "../queries/queries"


interface Book {
  name: String;
  id: any;
  genre?: String;
}

function BookList(props: any) {
  const [selected, setSelected] = useState(null)

  const displayBooks = (): any => {
    var data = props.data;
    if (data.loading) {
      return <LoadingSpinner>Loading data</LoadingSpinner>;
    }

    return data.books.map((book: Book) => (
      <BookListItem 
      key={book.id}
      onClick={() => setSelected(book.id)}
      >
        {book.name}
      </BookListItem>
    ));
  };

  return (
    <Container>
      <BookListContainer>{displayBooks()}</BookListContainer>
      <BookDetails bookId={selected} {...props}/>
    </Container>
  );
}

const Container = styled.div``;

const BookListContainer = styled.ul``;

const BookListItem = styled.li``;

const LoadingSpinner = styled.div``;
// binding query to the component
export default graphql(getBookQuery)(BookList);

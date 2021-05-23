import React from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo"
import styled from "styled-components";

// components
import BookList from "./components/BookList"
import AddBook from "./components/AddBook"

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})


function App() {
  return (
    <ApolloProvider client={client}>
    <MainContainer>
      <PageTitle>Ninja's Reading List</PageTitle>
      <BookList />
      <AddBook />
    </MainContainer>
    </ApolloProvider>
  );
}

const MainContainer = styled.main`

`
const PageTitle = styled.h1`

`

export default App;

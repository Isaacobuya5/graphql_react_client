import React from 'react'
import { graphql } from "react-apollo";
import styled from "styled-components";

import { getSingleBookQuery } from "../queries/queries"

interface Book {
    name: String;
    id: any;
    genre?: String;
  }

function BookDetails(props: any) {

    const displayBookDetails = () => {
        const { book } = props.data;
        if (book){
            return (
                <Container>
                    <Detail>{book.name}</Detail>
                    <Detail>{book.genre}</Detail>
                    <Detail>{book.author.name}</Detail>
                    <Detail>All books</Detail>
                    <AuthorBookList>
                        {book.author.books.map((item: Book) => {
                            return (
                                <BookListItem 
                                key={item.id}
                                >
                                    {item.name}
                                </BookListItem>
                            )
                        })}
                    </AuthorBookList>
                </Container>
            )
        }

        return <Detail>No book selected</Detail>
    }
    return (
        <Container>
            {displayBookDetails()}
        </Container>
    )
}

export default graphql(getSingleBookQuery, {
    options: (props: any) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails)

const Container = styled.div`

`

const Detail = styled.p`

`
const AuthorBookList = styled.ul`

`

const BookListItem = styled.li``;
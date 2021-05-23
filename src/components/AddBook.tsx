import React, {useState} from 'react'
import {flowRight as compose} from 'lodash'
import styled from "styled-components";

import { graphql,  } from "react-apollo"
import { getAuthorsQuery, addBookMutation, getBookQuery } from "../queries/queries"



interface Author {
    name: String,
    id: any
}

function AddBook(props: any) {

    const [book, setBook] = useState({
        name: "",
        genre: "",
        authorId: ""
    })


    const displayAuthors = () : any => {
        var data = props.getAuthorsQuery;
        if (data.loading) {
            return (<SelectOption disabled>Loading authors</SelectOption>)
        }

        return data.authors.map((author: Author) => (
            <SelectOption key={author.id} value={author.id}>{author.name}</SelectOption>
        ))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        setBook({
            ...book,
            [name]: value
        })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.addBookMutation({
            variables: {
                name: book.name,
                genre: book.genre,
                authorId: book.authorId
            },
            refetchQueries: [{ query: getBookQuery}]
        })
    }

    return (
        <BookForm onSubmit={handleSubmit}>
            <FormField>
                <FormLabel>Book name</FormLabel>
                <FormInput 
                type="text" 
                value={book.name} 
                name="name"
                onChange={handleChange} />
            </FormField>

            <FormField>
                <FormLabel>Genre</FormLabel>
                <FormInput 
                type="text" 
                value={book.genre} 
                name="genre" 
                onChange={handleChange}
                />
            </FormField>

            <FormField>
                <FormLabel>Author</FormLabel>
                <SelectInput 
                name="authorId"
                onChange={handleChange}>
                    <SelectOption>Select Authors</SelectOption>
                    {displayAuthors()}
                </SelectInput>
            </FormField>

            <AddBookButton>Add Book</AddBookButton>

        </BookForm>
    )
}

const BookForm = styled.form`

`

const FormField = styled.div`

`

const FormLabel = styled.label`
`
const FormInput = styled.input`

`

const SelectInput = styled.select`
`

const SelectOption = styled.option`
`

const AddBookButton = styled.button`
`

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook)

import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation ($title: String!, $description: String!, $authorId: ID!) {
        addBook(title: $title, description: $description, authorId: $authorId) {
            title
            description
            author {
                name
                surname
            }
        }
    }
`

export const DELETE_BOOK = gql`
    mutation ($id: ID) {
        deleteBook (id: $id) {
            title
        }
    }
`

export const ADD_AUTHOR = gql`
    mutation ($fio: String!, $surname: String, $name: String, $patronymic: String, $yearLife: String!) {
        addAuthor(fio: $fio, surname: $surname, name: $name, patronymic: $patronymic, yearLife: $yearLife) {
            fio
            surname
            name
            patronymic
            yearLife
        }
    }
`

export const DELETE_AUTHOR = gql`
    mutation ($id: ID) {
        deleteAuthor (id: $id) {
            fio
        }
    }
`
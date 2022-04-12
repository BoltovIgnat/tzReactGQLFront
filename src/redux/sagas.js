import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { call, put, takeEvery } from 'redux-saga/effects';

export default function* sagaWatcher() {
    yield takeEvery('GET_ALL_BOOKS', sagaWorkerGetBooks)
    yield takeEvery('GET_ALL_AUTHORS', sagaWorkerGetAuthor)
    yield takeEvery('GET_ONE_BOOK', sagaWorkerGetOneBook)
    yield takeEvery('GET_BOOKS_BY_NAME', sagaWorkerGetBooksByName)
    yield takeEvery('GET_ONE_AUTHOR', sagaWorkerGetOneAuthor)
}

function* sagaWorkerGetBooksByName(props) {
    
    const payload = yield call(gqlBooksByName, props.payload)
    yield put({ type: 'SET_BOOKS_BY_NAME', payload })
}

function* sagaWorkerGetBooks() {
    const payload = yield call(gqlBooks)
    yield put({ type: 'SET_ALL_BOOKS', payload })
}

function* sagaWorkerGetAuthor() {
    const payload = yield call(gqlAuthor)
    yield put({ type: 'SET_ALL_AUTHORS', payload })
}

function* sagaWorkerGetOneBook(id) {
    const payload = yield call(gqlOneBook, id.payload)
    yield put({ type: 'SET_ONE_BOOK', payload })
}

function* sagaWorkerGetOneAuthor(id) {
    const payload = yield call(gqlOneAuthor, id.payload)
    yield put({ type: 'SET_ONE_AUTHOR', payload })
}

async function gqlBooks() {
    const client = new ApolloClient({
        uri: 'http://localhost:3010/graphql',
        cache: new InMemoryCache()
    });
    const result = await client.query({
        query: gql`
            query {
                books {
                    id
                    title
                    description
                    author {
                        id
                        fio
                        yearLife
                    }
                }
            } 
      `
    })

    return result
}

async function gqlBooksByName(props) {

    const client = new ApolloClient({
        uri: 'http://localhost:3010/graphql',
        cache: new InMemoryCache()
    });
    const result = await client.query({
        query: gql`
            query ($name: String!) {
                bookByName(name: $name, ) {
                    title
                    description
                    author {
                        id
                        fio
                        yearLife
                    }
                }
            }
      `,
      variables: {
        name: props
      }
    })

    return result
}

async function gqlAuthor() {
    const client = new ApolloClient({
        uri: 'http://localhost:3010/graphql',
        cache: new InMemoryCache()
    });
    const result = await client.query({
        query: gql`
            query {
                authors {
                    id
                    fio
                    yearLife
                }
            } 
      `
    })

    return result
}

async function gqlOneBook(arg) {
    const client = new ApolloClient({
        uri: 'http://localhost:3010/graphql',
        cache: new InMemoryCache()
    });
    const result = await client.query({
        query: gql`
            query ($id: ID){
                book (id: $id){
                    id
                    title
                    description
                    author {
                        id
                        fio
                        yearLife
                    }
                }
            }
      `,
      variables: {
        id: arg
      }
    })

    return result
}

async function gqlOneAuthor(arg) {
    const client = new ApolloClient({
        uri: 'http://localhost:3010/graphql',
        cache: new InMemoryCache()
    });
    const result = await client.query({
        query: gql`
            query ($id: ID){
                author (id: $id){
                    id
                    fio
                    yearLife
                }
            }
      `,
      variables: {
        id: arg
      }
    })

    return result
}
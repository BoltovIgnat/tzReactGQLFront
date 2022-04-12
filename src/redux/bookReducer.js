const initialStore = {
    books: [],
    book: [],
    detailBookId: 43
}

export const bookReducer = (store = initialStore, action) => {
    switch (action.type) {
        case 'SET_ALL_BOOKS':
            return { ...store, books: action.payload.data.books }
        case 'SET_ONE_BOOK':
            return { ...store, book: action.payload.data.book}
        case 'ID_BOOK':
            return { ...store, detailBookId: action.payload}
        case 'SET_BOOKS_BY_NAME':
            return { ...store, books: [action.payload.data.bookByName] }
        default: return store
    }
}
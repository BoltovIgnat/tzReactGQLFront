const initialStore = {
    authors: [],
    author: [],
    detailAuthorId: 43
}

export const authorReducer = (store = initialStore, action) => {
    switch (action.type) {
        case 'SET_ALL_AUTHORS':
            return { ...store, authors: action.payload.data.authors }
        case 'SET_ONE_AUTHOR':
            return { ...store, author: action.payload.data.author}
        case 'ID_AUTHOR':
            return { ...store, detailAuthorId: action.payload}
        default: return store
    }
}
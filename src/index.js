import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createSagaMiddleware from '@redux-saga/core';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { applyMiddleware, compose, createStore } from 'redux';
import App from './App';
import AboutPage from './components/about';
import AboutAuthor from './components/author-about';
import AuthorsPage from './components/author';
import './index.css';
import { rootReducer } from './redux/rootReducer';
import sagaWatcher from './redux/sagas';
import reportWebVitals from './reportWebVitals';

const saga = createSagaMiddleware()

const store = createStore(rootReducer, compose(
	applyMiddleware(
		saga
	),
	window.__REDUX_DEVTOOLS_EXTENSION__
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: f => f
))

saga.run(sagaWatcher);

const client = new ApolloClient({
	uri: 'http://localhost:3010/graphql',
	cache: new InMemoryCache()
});

const app = (
	<ApolloProvider client={client}>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<App />} />
					<Route path="about" element={<AboutPage />} />
					<Route path="author" element={<AuthorsPage />} />
					<Route path="author-about" element={<AboutAuthor />} />
					
				</Routes>
			</BrowserRouter>
		</Provider>
	</ApolloProvider>
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{app}
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

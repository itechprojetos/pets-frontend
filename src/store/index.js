import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import history from '../routes/history'

import rootReducer from './reducers'
import rootSaga from './sagas'

const middlewares = []

const sagaMiddleware = createSagaMiddleware()

middlewares.push(sagaMiddleware)

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const composer = applyMiddleware(...middlewares, routerMiddleware(history))

const store = createStore(rootReducer(history), composer)

sagaMiddleware.run(rootSaga);

export default store

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers/index';
import rootSaga from './sagas/index';


const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
    sagaMiddleware
);

const store = createStore(reducer, middleware);


sagaMiddleware.run(rootSaga);


export default store;
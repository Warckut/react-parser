import { combineReducers } from '@reduxjs/toolkit';
// import { persistReducer } from 'redux-persist'
// import storage from "redux-persist/lib/storage";
import { visitEachChild } from 'typescript';
import videocardReducer from './videocardReducer'


// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['videocardReducer']
// }

const rootReducer = combineReducers({
    videocardReducer: videocardReducer
})

export default rootReducer;

// export default persistReducer(persistConfig, rootReducer);
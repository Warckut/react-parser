import { configureStore } from "@reduxjs/toolkit";
// import { persistStore } from "redux-persist";
import rootReducer from './rootReducer'

const store = configureStore({
    reducer: { rootReducer },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }), 
})

// export const persitor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
console.log(store.getState())
export default store
import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
/// <reference types="redux-persist" />
import authReducer from './authSlice'
import commonReducer from './commonSlice'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const reducers = combineReducers({
  auth: authReducer,
  common: commonReducer
})

const rootReducer = (state, action) => {
  return reducers(state, action)
}

const persistConfig = { key: 'root', storage, version: 1 }

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
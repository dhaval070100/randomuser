import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice'; 
import { usersApi } from '../services/User';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
console.log(usersApi);
export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    [usersApi.reducerPath]: usersApi.reducer
  },
  middleware: (getDefaultMid) => getDefaultMid().concat(usersApi.middleware),

});
setupListeners(store.dispatch);
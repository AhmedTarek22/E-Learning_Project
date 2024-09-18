import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./wishlistSlice";
import languageSlice from "./languageSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    language: languageSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import userReducer from "./slices/userSlice";
// import postReducer from "./slices/postSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    // post: postReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

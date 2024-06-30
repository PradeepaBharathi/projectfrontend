import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import projectReducer from './ProjectSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        projects:projectReducer
    }
})

export default store
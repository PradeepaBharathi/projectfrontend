import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import projectReducer from './ProjectSlice';

const rootReducer = combineReducers({
  user: userReducer,
  projects: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

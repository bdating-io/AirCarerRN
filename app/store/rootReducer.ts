import { combineReducers } from '@reduxjs/toolkit';
import { reducer as airCarerResuser } from '../slices/aircarer.slice';
import {reducer as taskSlice} from '../slices/task.slice'

export const rootReducer = combineReducers({
  aircarer: airCarerResuser,
  task:taskSlice
});

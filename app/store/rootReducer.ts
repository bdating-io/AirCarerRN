import { combineReducers } from '@reduxjs/toolkit';
import { reducer as airCarerResuser } from '../slices/aircarer.slice';

export const rootReducer = combineReducers({
  aircarer: airCarerResuser,
});

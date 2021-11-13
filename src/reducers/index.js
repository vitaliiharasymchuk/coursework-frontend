import { combineReducers } from 'redux';

import auth from './auth';
import admin from './admin';
import teacher from './teacher';
import student from './student';

export const reducers = combineReducers({ auth, admin, teacher, student });

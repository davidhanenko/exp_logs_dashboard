import { configureStore } from '@reduxjs/toolkit';

import logsReducer from '../features/logs/logsSlice';
import techsReducers from '../features/techs/techsSlice';

export default configureStore({
  reducer: {
    logs: logsReducer,
    techs: techsReducers,
  },
});

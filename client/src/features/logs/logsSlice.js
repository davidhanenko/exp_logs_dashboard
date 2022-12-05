import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchLogs = createAsyncThunk(
  `logs/fetchLogs`,
  async () => {
    try {
      const res = await fetch(`${API_URL}/api/logs`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const addLog = createAsyncThunk(
  'logs/addLog',
  async log => {
    const res = await fetch(`${API_URL}/api/logs`, {
      method: 'POST',
      body: JSON.stringify(log),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await res.json();
  }
);

export const searchLogs = createAsyncThunk(
  'logs/searchLogs',
  async text => {
    const res = await fetch(
      `${API_URL}/api/logs?q=${text}`
    );
    return await res.json();
  }
);

export const updateLog = createAsyncThunk(
  'logs/updateLog',
  async log => {
    const res = await fetch(
      `${API_URL}/api/logs/${log.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(log),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return await res.json();
  }
);

export const deleteLog = createAsyncThunk(
  'logs/deleteLog',
  async id => {
    await fetch(`${API_URL}/api/logs/${id}`, {
      method: 'DELETE',
    });
  }
);

const initialState = {
  logs: [],
  current: null,
  error: null,
  status: 'idle',
};

export const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    setCurrentLog: (state, action) => {
      state.current = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchLogs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = 'failed';
        console.log(action.payload);
        state.error = action.payload;
      })
      .addCase(addLog.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addLog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs.push(action.payload);
      })
      .addCase(searchLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = action.payload;
      })
      .addCase(updateLog.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateLog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = state.logs.map(log =>
          log._id === action.payload.id
            ? action.payload
            : log
        );
      })
      .addCase(deleteLog.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = state.logs.filter(
          log => log.id !== action.payload
        );
      });
  },
});

export const { setCurrentLog } = logsSlice.actions;

export default logsSlice.reducer;

export const selectAllLogs = state => state.logs.logs;

export const selectCurrentLog = state => state.logs.current;

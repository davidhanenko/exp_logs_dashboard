import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchTechs = createAsyncThunk(
  'techs/fetchTechs',
  async () => {
    const res = await fetch(`${API_URL}/api/techs`);
    return await res.json();
  }
);

export const addTech = createAsyncThunk(
  'techs/addTech',
  async tech => {
    const res = await fetch(`${API_URL}/api/techs`, {
      method: 'POST',
      body: JSON.stringify(tech),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await res.json();
  }
);

export const deleteTech = createAsyncThunk(
  'techs/deleteTech',
  async id => {
    await fetch(`${API_URL}/api/techs/${id}`, {
      method: 'DELETE',
    });
  }
);

const initialState = {
  techs: [],
  error: null,
  status: 'idle',
};

export const techsSlice = createSlice({
  name: 'techs',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchTechs.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchTechs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.techs = action.payload;
      })
      .addCase(fetchTechs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTech.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addTech.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.techs.push(action.payload);
      })
      .addCase(deleteTech.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteTech.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.techs = state.techs.filter(
          tech => tech.id !== action.payload
        );
      });
  },
});

export const {} = techsSlice.actions;

export default techsSlice.reducer;

export const selectAllTechs = state => state.techs.techs;

import { AsyncThunk, createAsyncThunk, createSlice,  nanoid, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store";

export interface IVideocard {
  id: string,
  price: number,
  href: string,
  shop: string,
  srcImage: string,
  name: string
}

export interface IVideocardState {
  count: number,
  status: string,
  videocards: IVideocard[],
  selectedShops: string[],
  currentPage: number,
  limitPages: number
}

const initialState = { 
  videocards: [], 
  status: 'success', 
  count: 0, 
  selectedShops: [],
  currentPage: 1,
  limitPages: 20
} as IVideocardState

export const getVideocards = createAsyncThunk(
  'videocards/getAll',
  async () => {
    const responce = await fetch('http://localhost:5000/videocards');
    const data = await responce.json()
    return data
  }
)

function unique(arr: string[]):string[] {
  let result: string[] = [];

  for (let str of arr)
    if (!result.includes(str))
      result.push(str);

  return result;
}

const videocardSlice = createSlice({
  name: 'videocards',
  initialState,
  reducers: {
    changeShops: {
      reducer: (state, action: PayloadAction<string[]>) => {
          state.selectedShops = action.payload
          state.count = state.videocards.length
      },
      prepare: (value: string[]) => ({payload: value})
    },
    changePage: {
      reducer: (state, action: PayloadAction<number>) => {
        state.currentPage = action.payload
      },
      prepare: (value: number) => ({payload: value})
    }
  },
  extraReducers: {
    [getVideocards.pending.type]: (state, action) => {
      state.status = 'loading'
    },
    [getVideocards.fulfilled.type]: (state, { payload }) => {
      state.videocards = payload;
      state.status = 'success'
    },
    [getVideocards.rejected.type]: (state, action) => {
      state.status = 'failed'
    }
  }
})

export const { changeShops, changePage } = videocardSlice.actions
export const selectStatus = (state: RootState) => state.rootReducer.videocardReducer.status
export const selectCountVideocards = (state: RootState) => state.rootReducer.videocardReducer.count
export default videocardSlice.reducer

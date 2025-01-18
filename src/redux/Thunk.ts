import {
  AsyncThunk,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
} from "@reduxjs/toolkit";

interface ThunkAPIConfig {}

export const Thunk = <Returned, ThunkArg = any>(
  path: string,
  thunk: AsyncThunkPayloadCreator<Returned, ThunkArg>
): AsyncThunk<Returned, ThunkArg, ThunkAPIConfig> => {
  return createAsyncThunk<Returned, ThunkArg, ThunkAPIConfig>(
    path,
    (arg, thunkAPI) => thunk(arg, thunkAPI),
    { serializeError: (x) => x as any }
  );
};

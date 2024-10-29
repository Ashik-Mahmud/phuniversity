import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitState } from "./auth.types";


const initialState: IInitState = {
    token: null,
    user: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        onLogin: (state: IInitState, action: PayloadAction<IInitState>) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
        },
        onLogout: (state: IInitState) => {
            state.token = null;
            state.user = null;
        }
    }
})

export const { onLogout, onLogin } = authSlice.actions;
export default authSlice.reducer;


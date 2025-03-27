import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Users {
    username: string;
    user_id: number;
}

const initialState: Users = {
    username: "null",
    user_id: -1,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>){
            state.username = action.payload
        },
        setUserID(state, action: PayloadAction<number>){
            state.user_id = action.payload
        }
    }
})

export const {setUserID, setUsername} = userSlice.actions;

export default userSlice.reducer
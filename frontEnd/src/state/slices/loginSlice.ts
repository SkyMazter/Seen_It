import { createSlice } from '@reduxjs/toolkit'


// Define a type for the slice state
interface Login {
  isActive: boolean
}

// Define the initial state using that type
const initialState: Login = {
  isActive: false,
}

export const loginSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setActive: (state) => {
        state.isActive = true;
    },
    setInactive: (state) => {
        state.isActive = false;
    }
  },
})

export const { setActive, setInactive } = loginSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default loginSlice.reducer
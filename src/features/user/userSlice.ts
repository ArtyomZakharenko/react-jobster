import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserState } from "../../models/states/UserState";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import { RegisterState } from "../../pages/Register";
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from "../../utils/localStorage";

const initialState: UserState = {
	user: getUserFromLocalStorage(),
	isLoading: false,
	isSidebarOpen: false,
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user: RegisterState, thunkAPI) => {
		try {
			const response = await customFetch.post('/auth/register', user);
			return response.data;
		} catch (error) {
			// @ts-ignore
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user: RegisterState, thunkAPI) => {
		try {
			const response = await customFetch.post('/auth/login', user);
			return response.data;
		} catch (error) {
			// @ts-ignore
			return thunkAPI.rejectWithValue(error.response.data.msg);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
		},
		toggleSidebar: (state) => {
			state.isSidebarOpen = !state.isSidebarOpen;
		},

	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			const { user } = action.payload as { user: User };
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Hello  ${user.name}`);
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			const { user } = action.payload as { user: User };
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`Welcome back ${user.name}`);
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
	}
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;

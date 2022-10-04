import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, registerUserThunk, updateUserThunk, } from './userThunk';
import { User, UserState } from "../../models/states/UserState";
import { toast } from "react-toastify";
import { RegisterState } from "../../pages/Register";
import {
	addUserToLocalStorage,
	getUserFromLocalStorage,
	removeUserFromLocalStorage
} from "../../utils/localStorage";


const initialState: UserState = {
	user: getUserFromLocalStorage(),
	isLoading: false,
	isSidebarOpen: false,
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (user: RegisterState, thunkAPI) => registerUserThunk('/auth/register', user, thunkAPI)
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (user: RegisterState, thunkAPI) => loginUserThunk('/auth/login', user, thunkAPI)
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user: User, thunkAPI) => updateUserThunk('/auth/updateUser', user, thunkAPI)
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser: (state,  action) => {
			state.user = null;
			state.isSidebarOpen = false;
			removeUserFromLocalStorage();
			if (action.payload) toast.success(action.payload);
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
		builder.addCase(updateUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			const { user } = action.payload as { user: User };
			state.isLoading = false;
			state.user = user;
			addUserToLocalStorage(user);
			toast.success(`User updated successfully`);
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.isLoading = false;
			toast.error(action.payload as string);
		});
	}
});

export const { toggleSidebar, logoutUser } = userSlice.actions;
export default userSlice.reducer;

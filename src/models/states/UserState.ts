export interface UserState {
	user: User | null;
	isLoading: boolean;
	isSidebarOpen: boolean;
}

export interface User {
	name: string;
	lastName: string;
	email: string;
	location: string;
	token: string;
}

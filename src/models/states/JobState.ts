export interface Job {
	position: string;
	company: string;
	jobLocation: string;
	jobType: string;
	status: string;
}

export interface JobState extends Job {
	isLoading: boolean;
	jobTypeOptions: string[];
	statusOptions: string[];
	isEditing: boolean;
	editJobId: string;
}



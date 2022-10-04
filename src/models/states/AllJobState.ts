import { Job } from "./JobState";

export interface FilterState {
	search: string;
	searchStatus: string;
	searchType: string;
	sort: string;
	sortOptions: string[];
}

export interface AllJobState extends FilterState {
	isLoading: boolean;
	jobs: JobItem[];
	totalJobs: number;
	numOfPages: number;
	page: number;
	stats: Stats;
	monthlyApplications: Application[];
}

export interface JobItem extends Job {
	_id: string;
	createdAt: string;
	createBy: string;
	updateAt: string;
}

export interface Stats {
	interview: number;
	declined: number;
	pending: number;
	offer: number;
}

export interface Application {
	date: string;
	count: number;
}


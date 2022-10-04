import { ChangeEvent } from "react";

export interface FormRowProps {
	labelText?: string;
	name: string;
	type: string;
	value: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface FormRowSelectProps {
	labelText?: string;
	name: string;
	value: string;
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	list: string[];
}



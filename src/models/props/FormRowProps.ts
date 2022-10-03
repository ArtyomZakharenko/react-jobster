import { ChangeEvent } from "react";

export interface FormRowProps {
	labelText?: string;
	name: string;
	type: string;
	value: string;
	handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}


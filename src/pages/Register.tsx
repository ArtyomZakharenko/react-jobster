import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
// redux toolkit and useNavigate later

const initialState = {
	name: '',
	email: '',
	password: '',
	isMember: true,
};

export type RegisterState = typeof initialState;

function Register() {
	const navigate = useNavigate();
	const [values, setValues] = useState(initialState);
	const { user, isLoading } = useSelector((store: RootState) => store.user);
	const dispatch = useDispatch<AppDispatch>();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const name = e.target.name;
		const value = e.target.value;
		setValues({ ...values, [name]: value });
	};

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { name, email, password, isMember } = values;
		if (!email || !password || (!isMember && !name)) {
			toast.error('Please fill out all fields');
			return;
		}
		if (isMember) {
			dispatch(loginUser({ email, password } as RegisterState));
			return;
		}
		dispatch(registerUser({ name, email, password } as RegisterState));
	};

	const toggleMember = () => {
		setValues({ ...values, isMember: !values.isMember });
	}

	useEffect(() => {
		if (user) {
			setTimeout(() => {
				navigate('/');
			}, 2000);
		}
	}, [user, navigate]);

	return (
		<Wrapper className='full-page'>
			<form className='form' onSubmit={onSubmit}>
				<Logo/>
				<h3>{values.isMember ? 'Login' : 'Register'}</h3>

				{/* name field */}
				{!values.isMember && (
					<FormRow
						name='name'
						type='text'
						value={values.name}
						handleChange={handleChange}
					/>
				)}
				{/* email field */}
				<FormRow
					type='email'
					name='email'
					value={values.email}
					handleChange={handleChange}
				/>
				{/* password field */}
				<FormRow
					type='password'
					name='password'
					value={values.password}
					handleChange={handleChange}
				/>

				<button
					type='submit'
					className='btn btn-block'
					disabled={isLoading}
				>
					{isLoading ? 'Loading...' : 'Submit'}
				</button>
				<button
					type='button'
					className='btn btn-block btn-hipster'
					disabled={isLoading}
					onClick={() => {
						dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' } as RegisterState));
					}}
				>
					{isLoading ? 'loading...' : 'demo'}
				</button>
				<p>
					{values.isMember ? 'Need to register?' : 'Already a member?'}
					<button
						type='button'
						onClick={toggleMember}
						className='member-btn'
					>
						{values.isMember ? 'Register' : 'Login'}
					</button>

				</p>
			</form>
		</Wrapper>
	);
}

export default Register;
